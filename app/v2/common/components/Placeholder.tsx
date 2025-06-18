const Placeholder: React.FC<PlaceholderProps> = ({
  text,
  backgroundColor = '#6b7280',
  textColor = '#ffffff',
  size = 60,
  className = ''
}) => {
  // Function to get contrasting text color if not provided
  const getContrastColor = (hexColor: string): string => {
    // Remove # if present
    const color = hexColor.replace('#', '');

    // Convert to RGB
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  // Determine font size based on container size and text length
  const getFontSize = (containerSize: number, textLength: number): number => {
    const baseSize = containerSize * 0.25;
    const scaleFactor = Math.max(0.4, 1 - (textLength - 2) * 0.1);
    return Math.max(10, baseSize * scaleFactor);
  };

  const finalTextColor = textColor || getContrastColor(backgroundColor);
  const fontSize = getFontSize(size, text.length);

  return (
    <div
      className={`inline-flex items-center justify-center font-semibold text-center select-none ${className}`}
      style={{
        backgroundColor,
        color: finalTextColor,
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${fontSize}px`,
        borderRadius: '0.375rem' // rounded-md equivalent
      }}
    >
      <span className="truncate px-1">
        {text}
      </span>
    </div>
  );
};

export default Placeholder;