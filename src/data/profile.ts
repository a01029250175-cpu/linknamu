export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 기준 경로. 없으면 이름 첫 글자로 대체 */
  image?: string;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "연습 중",
  bio: "연습삼아 만드는 중",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com" },
    { id: "blog", title: "블로그", url: "https://velog.io" },
    { id: "instagram", title: "Instagram", url: "https://instagram.com" },
  ],
};
