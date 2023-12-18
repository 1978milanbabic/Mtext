import React, {
  ReactNode,
  CSSProperties,
  useRef,
  useState,
  useEffect,
  SetStateAction,
} from 'react';
import parse from 'html-react-parser';
// component specifyc styles
import './Mtext.module.scss';

type Props = {
  children?: ReactNode | null;
  as: string;
  style?: CSSProperties | null;
};

const Mtext = ({ children, as, style }: Props) => {
  const [innerContent, setInnerContent] = useState<ReactNode | null>(null);
  const [innerText, setInnerText] = useState<string>('');
  const wrapperRef = useRef();

  useEffect(() => {
    setInnerContent(children);
  }, [children]);

  // useEffect(() => {
  //   innerContent && console.log(innerContent);
  // }, [innerContent]);

  const handleTyping = (e: any) => {
    setInnerText(e);
    console.log(e);
  };

  return (
    <>
      <div
        style={style}
        contentEditable={true}
        onInput={(e) => handleTyping(e.currentTarget.textContent)}
        ref={wrapperRef}
      >
        {innerContent}
      </div>
      {/* TEST DIV -> REMOVE THIS AND <></> */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      >
        {parse(innerText)}
      </div>
    </>
  );
};

export default Mtext;
