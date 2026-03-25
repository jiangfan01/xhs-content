import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Star,
  Search,
  Library,
  Trash2,
  ExternalLink,
  Image,
  Video,
} from "lucide-react";
import { useNoteList, useDeleteNotes } from "~/hooks/useCollection";
import type { XhsCollectedNote } from "~/api/collection";
import "./collection.css";

export default function CollectionPage() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [noteType, setNoteType] = useState<"image" | "video" | undefined>();
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const pageSize = 20;
  const { data, isLoading, isError } = useNoteList({ page, pageSize, keyword, noteType });
  const deleteMutation = useDeleteNotes();

  const notes = data?.list ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  const handleSearch = () => {
    setKeyword(searchInput.trim());
    setPage(1);
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === notes.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(notes.map((n) => n.id)));
    }
  };

  const handleDelete = () => {
    if (selected.size === 0) return;
    deleteMutation.mutate([...selected], {
      onSuccess: () => setSelected(new Set()),
    });
  };

  return (
    <div className="collection-page">
      <div className="collection-header">
        <div>
          <h1>笔记采集</h1>
          <p>从小红书采集的笔记内容，共 {total} 篇</p>
        </div>
      </div>

      <div className="collection-toolbar">
        <div className="collection-search">
          <Search size={16} className="collection-search__icon" />
          <input
            type="text"
            placeholder="搜索标题或内容..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <div className="collection-filters">
          <button
            className={`collection-filter-btn ${noteType === undefined ? "active" : ""}`}
            onClick={() => { setNoteType(undefined); setPage(1); }}
          >
            全部
          </button>
          <button
            className={`collection-filter-btn ${noteType === "image" ? "active" : ""}`}
            onClick={() => { setNoteType("image"); setPage(1); }}
          >
            <Image size={14} />
            图文
          </button>
          <button
            className={`collection-filter-btn ${noteType === "video" ? "active" : ""}`}
            onClick={() => { setNoteType("video"); setPage(1); }}
          >
            <Video size={14} />
            视频
          </button>
        </div>

        {selected.size > 0 && (
          <button className="collection-delete-btn" onClick={handleDelete} disabled={deleteMutation.isPending}>
            <Trash2 size={15} />
            删除 {selected.size} 项
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="collection-loading">
          <div className="collection-spinner" />
        </div>
      ) : isError ? (
        <div className="collection-empty">
          <p>加载失败，请稍后重试</p>
        </div>
      ) : notes.length === 0 ? (
        <div className="collection-empty">
          <div className="collection-empty__icon">
            <Library size={28} />
          </div>
          <h3>暂无采集内容</h3>
          <p>使用浏览器插件采集小红书笔记后，内容将显示在这里</p>
        </div>
      ) : (
        <>
          <div className="collection-list-header">
            <label className="collection-checkbox-wrap">
              <input
                type="checkbox"
                checked={notes.length > 0 && selected.size === notes.length}
                onChange={toggleSelectAll}
              />
              全选
            </label>
          </div>

          <div className="collection-grid">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                isSelected={selected.has(note.id)}
                onToggle={() => toggleSelect(note.id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="collection-pagination">
              <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
                上一页
              </button>
              <span>{page} / {totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                下一页
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function NoteCard({
  note,
  isSelected,
  onToggle,
}: {
  note: XhsCollectedNote;
  isSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <article className={`note-card ${isSelected ? "note-card--selected" : ""}`}>
      <div className="note-card__select">
        <input type="checkbox" checked={isSelected} onChange={onToggle} />
      </div>

      {note.cover_url && (
        <div className="note-card__cover">
          <img src={note.cover_url} alt={note.title} loading="lazy" />
          <span className="note-card__type">
            {note.note_type === "video" ? <Video size={12} /> : <Image size={12} />}
            {note.note_type === "video" ? "视频" : "图文"}
          </span>
        </div>
      )}

      <div className="note-card__body">
        <h3 className="note-card__title">
          <a href={note.note_url} target="_blank" rel="noopener noreferrer">
            {note.title || "无标题"}
            <ExternalLink size={13} />
          </a>
        </h3>

        {note.content && (
          <p className="note-card__content">{note.content}</p>
        )}

        <div className="note-card__author">
          {note.author_avatar ? (
            <img src={note.author_avatar} alt={note.author_name} />
          ) : (
            <span className="note-card__avatar-placeholder" />
          )}
          <span>{note.author_name || "未知作者"}</span>
        </div>

        <div className="note-card__stats">
          <span><Heart size={13} /> {note.like_count}</span>
          <span><Star size={13} /> {note.collect_count}</span>
          <span><MessageCircle size={13} /> {note.comment_count}</span>
        </div>

        {note.tags && note.tags.length > 0 && (
          <div className="note-card__tags">
            {note.tags.slice(0, 5).map((tag) => (
              <span key={tag} className="note-card__tag">#{tag}</span>
            ))}
          </div>
        )}

        <div className="note-card__time">
          采集于 {new Date(note.collected_at).toLocaleDateString("zh-CN")}
        </div>
      </div>
    </article>
  );
}
