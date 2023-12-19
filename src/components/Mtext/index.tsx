import React, {
  ReactNode,
  CSSProperties,
  useRef,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
  useMemo,
  MouseEvent,
} from 'react';
import parse, { domToReact } from 'html-react-parser';
import uuid from 'react-uuid';
// component specific styles
import './Mtext.scss';

type Props = {
  children?: ReactNode | string | null;
  as: string;
  style?: CSSProperties | null;
  setNmbToSolve: Dispatch<SetStateAction<number>>;
  abbrText?: string;
};

const Mtext = ({ children, as, style, setNmbToSolve, abbrText }: Props) => {
  const uniqueId = uuid();
  const [initionalContent, setInitionalcontent] = useState<ReactNode | null>(
    null,
  );
  const [innerContent, setInnerContent] = useState<ReactNode | null>(null);
  const [innerText, setInnerText] = useState<string>('');
  const [solvePerComponent, setSolvePerComponent] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement>();

  // click on mandatory edit
  const handleClick = (e: MouseEvent) => {
    const span = e.target as HTMLSpanElement;
    // set parent state to 'resolved' -> if not already resolved
    if (span.className === 'unresolved') {
      setNmbToSolve((nmbToSolve) => nmbToSolve - 1);
      setSolvePerComponent((solvePerComponent) => solvePerComponent - 1);
    }
    // set className to 'resolved'
    span.className = '';
    // set spans ready for editing
    span.contentEditable = 'true';
    // set auto-selected text
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(span, 0);
    range.setEnd(span, 1);
    selection.removeAllRanges();
    selection.addRange(range);
    // discard parent abbr
    const abbr: HTMLElement | null = span?.parentElement;
    if (abbr?.title) abbr.title = '';
  };

  // initional content
  useMemo(() => {
    setInitionalcontent(children);
  }, []);

  useEffect(() => {
    // parse to html tags
    const content = document.querySelector(
      `[data-unique = "${uniqueId}"]`,
    )?.innerHTML;
    // get initional content and modify to starting model
    const options = {
      replace(domNode: any) {
        const { attribs, children: childs } = domNode;
        if (domNode?.name === 'span') {
          // increase nmb for solve
          setNmbToSolve((nmbToSolve) => nmbToSolve + 1);
          // set memory per component
          setSolvePerComponent((solvePerComponent) => solvePerComponent + 1);
          // set spans for editing
          return (
            <abbr title={abbrText}>
              <span
                className='unresolved'
                contentEditable={false}
                onClick={(e) => handleClick(e)}
              >
                {domToReact(childs, options)}
              </span>
            </abbr>
          );
        }
      },
    };
    // set react DOM
    setInnerContent(parse(content, options));
  }, [initionalContent]);

  const handleTyping = (e: any) => {
    // check for unresolved number in case of text deletion
    const virtualModifiedElement: HTMLDivElement =
      document.createElement('div');
    virtualModifiedElement.innerHTML = e;
    let countUnresolved = 0;
    const options = {
      replace(domNode: any) {
        const { attribs, children: childs } = domNode;
        if (domNode?.name === 'span' && attribs.class === 'unresolved') {
          countUnresolved++;
          return (
            <span
              className='unresolved'
              contentEditable={false}
              onClick={(e) => handleClick(e)}
            >
              {domToReact(childs, options)}
            </span>
          );
        }
      },
    };
    let parsedEl = parse(e, options);
    let localyResolvedChanged = solvePerComponent - countUnresolved;
    // set nmbTo solve
    setSolvePerComponent(
      (solvePerComponent) => solvePerComponent - localyResolvedChanged,
    );
    setNmbToSolve((nmbToSolve) => nmbToSolve - localyResolvedChanged);
    // set text
    setInnerText(e);
  };

  return (
    <>
      <div
        className='text-for-editing'
        style={style}
        contentEditable={true}
        onInput={(e) => handleTyping(e.currentTarget.innerHTML)}
        ref={wrapperRef}
      >
        {innerContent}
      </div>
      <div
        className='initional-content'
        style={{ display: 'none' }}
        data-unique={uniqueId}
      >
        {initionalContent}
      </div>
    </>
  );
};

export default Mtext;
