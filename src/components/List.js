/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import React from "react";
import ListItem from "./ListItem";

/**
 * 1. читаешь про useState
 * 2. в ListItem добавляешь проп editable
 *      если editable = true то вместо дивчика показываешь input, в который преедаёшь props.tile в value
 *      так же надо передать обработчик изменения onChange в ListItem а потом в input
 *      сам функция будет находится в List, например onListItemChange, в которой ты будешь изменять состояние
 *      onListItemChange ещё должен принимать индекс, по которому ты будешь находить в categories какой из объектов изменять
 *      индекс это второй аргумент в колбеке map
 * 3. ListItem ещё должен принимать обработчик onEditFinish
 *      для его реализации нужно воспользоваться функцией useEffect, про которую тоже почитай
 *      в useEffect ты должна подписаться на keydown у window, и проверять на нажатие клавиши enter, и не забыть отписаться от window если компонент удаляется (это делается тоже в useEffect)
 *      если нажата клавиша enter то вызываешь оработчик onEditFinish, который в List должен поменять editable на false
 * 4. count в ListItem передавать отдельным пропсом, чтобы его нельзя было редактировать
 * 5. в ListItem button тебе надо передавать обработчик onClick, который по клику сразу будет добавлять новый объект с пустым title и editable = true в ссстояние
 * 6. в categories должно ъранится остояние editable
 */

function List() {
  const categories = [
    { title: "Программирование", count: 2 },
    { title: "Дизайн", count: 0 },
    { title: "Смешнявки", count: 0 }
  ];

  return (
    <div
      css={css`
        padding: 0 8px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        flex-grow: 1;
      `}
    >
      {categories.map(category => (
        <ListItem
          key={category.title}
          title={`${category.title} (${category.count})`}
        />
      ))}
      <ListItem button title="Новая категория" />
    </div>
  );
}

export default List;
