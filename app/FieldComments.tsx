"use client";
import { useRef, useState } from "react";

type Comment = { id: string; author: string; body: string; createdAt: string; parentId: string | null; replyTo: string | null };

export default function FieldComments({ postId, language }: { postId: string; language: "zh" | "en" }) {
  const zh = language === "zh";
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [more, setMore] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [reply, setReply] = useState<Comment | null>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const pendingId = useRef<string | null>(null);
  const busy = useRef(false);
  async function load(offset = 0) {
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/community-comments?postId=${postId}&offset=${offset}`, { cache: "no-store" });
      if (!response.ok) throw new Error();
      const data = await response.json();
      setComments(previous => offset ? [...previous, ...data.comments] : data.comments);
      setMore(data.hasMore); setLoaded(true);
    } catch { setError(zh ? "评论加载失败，请重试。" : "Could not load comments. Please retry."); }
    finally { setLoading(false); }
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true; setSaving(true); setError(""); setNotice("");
    pendingId.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/community-comments", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: pendingId.current, postId, parentId: reply?.id || null, author, body }) });
      if (!response.ok) {
        setError(response.status === 429 ? (zh ? "请间隔 15 秒再发送；每天最多 30 条评论或回复。" : "Wait 15 seconds between messages; daily limit: 30.") : (zh ? "发送失败，内容已保留，请重试。" : "Could not send. Your draft is saved here; please retry."));
        return;
      }
      setBody(""); setReply(null); pendingId.current = null;
      setNotice(zh ? "已发布评论。" : "Comment published.");
      await load();
    } catch { setError(zh ? "网络异常，内容已保留，请重试。" : "Connection failed. Your draft is still here; please retry."); }
    finally { busy.current = false; setSaving(false); }
  }
  return <section className="field-comments">
    <button type="button" aria-expanded={open} onClick={() => { setOpen(!open); if (!open && !loaded) void load(); }}>{open ? (zh ? "收起评论" : "Hide comments") : (zh ? "评论与回复" : "Comments & replies")}</button>
    {open && <div>
      {comments.map(comment => <article className={comment.parentId ? "field-comment is-reply" : "field-comment"} key={comment.id}>
        <strong>{comment.author}</strong> <time dateTime={comment.createdAt}>{new Date(comment.createdAt).toLocaleString(zh ? "zh-CN" : "en-GB")}</time>
        {comment.replyTo && <small>{zh ? "回复 " : "Reply to "}{comment.replyTo}</small>}
        <p>{comment.body}</p>
        <button type="button" disabled={saving} onClick={() => { setReply(comment); pendingId.current = null; input.current?.focus(); }}>{zh ? "回复" : "Reply"}</button>
      </article>)}
      {loading && <p role="status">{zh ? "正在加载评论…" : "Loading comments…"}</p>}
      {loaded && !comments.length && <p>{zh ? "还没有评论，来聊聊这次发现吧。" : "No comments yet. Share your thoughts on this find."}</p>}
      {!loading && (!loaded || more) && <button type="button" onClick={() => void load(loaded ? comments.length : 0)}>{loaded ? (zh ? "加载更多" : "Load more") : (zh ? "重新加载" : "Retry")}</button>}
      <form onSubmit={submit}>
        {reply && <div>{zh ? "回复 " : "Reply to "}{reply.author} <button type="button" disabled={saving} onClick={() => { setReply(null); pendingId.current = null; }}>{zh ? "取消回复" : "Cancel reply"}</button></div>}
        <label>{zh ? "昵称" : "Name"}<input value={author} minLength={2} maxLength={20} required disabled={saving} onChange={e => { setAuthor(e.target.value); pendingId.current = null; }} /></label>
        <label>{zh ? "评论内容" : "Comment"}<textarea ref={input} rows={3} value={body} maxLength={500} required disabled={saving} onChange={e => { setBody(e.target.value); pendingId.current = null; }} /></label>
        <small>{body.length}/500 · {zh ? "评论公开可见，昵称未经身份认证，请勿发布隐私信息。" : "Public comments; names are unverified. Do not share private information."}</small>
        {error && <p role="alert">{error}</p>}{notice && <p role="status">{notice}</p>}
        <button type="submit" disabled={saving || author.trim().length < 2 || !body.trim()}>{saving ? (zh ? "发送中…" : "Sending…") : (zh ? "发布" : "Post")}</button>
      </form>
    </div>}
  </section>;
}
