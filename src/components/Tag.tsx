interface TagProps {
  children: React.ReactNode;
  highlight?: boolean;
}

export function Tag({ children, highlight = false }: TagProps) {
  return (
    <span className={highlight ? "ui-tag ui-tag-highlight" : "ui-tag"}>
      {children}
    </span>
  );
}
