import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./ContextMenu.module.css";

const ContextMenu = ({ id, items, onItemClicked, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const contextMenuHandler = (e) => {
    e.preventDefault();
    setIsVisible(true);
    setPosition({ x: e.pageX, y: e.pageY });
  };

  const keyDownHandler = (e) => {
    if (e.code === "Escape") {
      setIsVisible(false);
    }
  };

  const clickHandler = useCallback((e) => {
    if (isVisible) {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY > rect.top ||
          e.clientY < rect.bottom
        ) {
          setIsVisible(false);
        }
      }
    }
  }, [isVisible]);

  const customContextMenuOpenedHandler = useCallback((e) => {
    if(e.detail !== id) {
      setIsVisible(false);
    }
  }, [id]);

  useEffect(() => {
    document.addEventListener("contextMenuOpened", customContextMenuOpenedHandler);
    return () => {
      document.removeEventListener("contextMenuOpened", customContextMenuOpenedHandler);
    };
  }, [customContextMenuOpenedHandler]);

  useEffect(() => {
    if (isVisible) {
      document.dispatchEvent(new CustomEvent("contextMenuOpened", {
        detail: id
      }));
    }
  }, [isVisible, id]);

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("click", clickHandler)

    return () => {
      window.removeEventListener("click", clickHandler);
    }
  }, [clickHandler])

  return (
    <>
      <div onContextMenu={contextMenuHandler}>{children}</div>
      {isVisible && (
        <ul ref={ref} style={{ left: position.x, top: position.y }} className={styles.contextMenu}>
          {items.map((item) => (
            <li key={item.id} onClick={() => {
              setIsVisible(false);
              onItemClicked(item);
            }}>
              {item.caption}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ContextMenu;
