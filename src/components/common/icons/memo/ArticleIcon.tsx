import React from 'react';
import Svg, {Path, Mask, Rect, G} from 'react-native-svg';

const ArticleIcon = ({width = 26, height = 26, fill = '#000', style}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={[style, {color: fill}]}>
      <Path
        d="M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.0007 4.45067 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5ZM8 17H13C13.2833 17 13.521 16.904 13.713 16.712C13.905 16.52 14.0007 16.2827 14 16C13.9993 15.7173 13.9033 15.48 13.712 15.288C13.5207 15.096 13.2833 15 13 15H8C7.71667 15 7.47933 15.096 7.288 15.288C7.09667 15.48 7.00067 15.7173 7 16C6.99933 16.2827 7.09533 16.5203 7.288 16.713C7.48067 16.9057 7.718 17.0013 8 17ZM8 13H16C16.2833 13 16.521 12.904 16.713 12.712C16.905 12.52 17.0007 12.2827 17 12C16.9993 11.7173 16.9033 11.48 16.712 11.288C16.5207 11.096 16.2833 11 16 11H8C7.71667 11 7.47933 11.096 7.288 11.288C7.09667 11.48 7.00067 11.7173 7 12C6.99933 12.2827 7.09533 12.5203 7.288 12.713C7.48067 12.9057 7.718 13.0013 8 13ZM8 9H16C16.2833 9 16.521 8.904 16.713 8.712C16.905 8.52 17.0007 8.28267 17 8C16.9993 7.71733 16.9033 7.48 16.712 7.288C16.5207 7.096 16.2833 7 16 7H8C7.71667 7 7.47933 7.096 7.288 7.288C7.09667 7.48 7.00067 7.71733 7 8C6.99933 8.28267 7.09533 8.52033 7.288 8.713C7.48067 8.90567 7.718 9.00133 8 9Z"
        fill="currentColor"
      />
    </Svg>
  );
};

export default ArticleIcon;
