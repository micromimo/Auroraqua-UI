import { forwardRef } from 'react';
import { Search } from 'lucide-react';

const sizeConfig = {
  sm: {
    text: 'text-xs',
    py: 6,
    pl: 32,
    pr: 12,
    iconLeft: 10,
    iconSize: 14,
    rounded: 'rounded-lg',
  },
  md: {
    text: 'text-sm',
    py: 10,
    pl: 36,
    pr: 16,
    iconLeft: 12,
    iconSize: 16,
    rounded: 'rounded-xl',
  },
  lg: {
    text: 'text-base',
    py: 12,
    pl: 40,
    pr: 16,
    iconLeft: 12,
    iconSize: 20,
    rounded: 'rounded-xl',
  },
};

const SearchInput = forwardRef(function SearchInput(
  {
    value,
    onChange,
    placeholder = '搜索...',
    size = 'md',
    width = 'w-full',
    glass = true,
    opacity,
    blur,
    iconSize,
    className = '',
    style,
    ...props
  },
  ref
) {
  const config = sizeConfig[size] || sizeConfig.md;
  const resolvedIconSize = iconSize || config.iconSize;

  const glassStyle =
    glass && (opacity !== undefined || blur !== undefined)
      ? {
          backgroundColor: `rgba(255, 255, 255, ${opacity ?? 0.45})`,
          backdropFilter: `blur(${blur ?? 8}px)`,
          WebkitBackdropFilter: `blur(${blur ?? 8}px)`,
        }
      : {};

  return (
    <div className={`relative ${width}`}>
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={[
          'w-full',
          glass ? 'input-glass' : '',
          config.text,
          config.rounded,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          paddingLeft: config.pl,
          paddingRight: config.pr,
          paddingTop: config.py,
          paddingBottom: config.py,
          ...glassStyle,
          ...style,
        }}
        {...props}
      />
      <Search
        className="absolute top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        style={{
          left: config.iconLeft,
          width: resolvedIconSize,
          height: resolvedIconSize,
        }}
      />
    </div>
  );
});

export default SearchInput;
