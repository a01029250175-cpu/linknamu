"use client";

type Props = {
  id: string;
  title: string;
  url: string;
  count: number;
  onClick?: (id: string) => void;
};

export default function LinkCard({ id, title, url, count, onClick }: Props) {
  // 페이지를 떠나도 요청이 끝까지 전송되도록 sendBeacon 사용
  const recordClick = () => {
    navigator.sendBeacon(`/api/clicks/${encodeURIComponent(id)}`);
    onClick?.(id);
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={recordClick}
      className="relative block w-full rounded-2xl border border-emerald-100 bg-white px-16 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
    >
      {title}
      <span className="absolute top-1/2 right-5 -translate-y-1/2 text-xs font-normal text-gray-400 tabular-nums">
        {count.toLocaleString()}회
      </span>
    </a>
  );
}
