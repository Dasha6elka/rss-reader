/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useState } from "react";
import Search from "../components/Search";
import Post from "../components/Post";

function Posts() {
  const [posts, setPosts] = useState([
    {
      title: "Ещё лучшая ZIP-бомба",
      visited: false,
      visible: false,
      date: "Mon, 08 Jul 2019 18:52:10 GMT",
      description:
        'В статье показано, как создать <i>нерекурсивную</i> <a href="https://en.wikipedia.org/wiki/Zip_bomb">zip-бомбу</a>, которая обеспечивает высокую степень сжатия путём перекрытия файлов внутри zip-контейнера. «Нерекурсивная» означает, что она не зависит от рекурсивной распаковки декомпрессорами файлов, вложенных в zip-архивы: здесь всего один раунд. Выходной размер увеличивается квадратично от входного, достигая степени сжатия более 28 миллионов (10 МБ → 281 ТБ) в пределах формата zip. Ещё большее расширение возможно с помощью 64-разрядных расширений. Конструкция использует только наиболее распространённый алгоритм сжатия DEFLATE и совместима с большинством парсеров zip.<br>\n' +
        " <br>\n" +
        ' <a name="2"></a><ul>\n' +
        ' <li><a href="https://www.bamsoftware.com/hacks/zipbomb/zbsm.zip">zbsm.zip</a> 42 kB → 5.5 GB<br>\n' +
        " </li>\n" +
        ' <li><a href="https://www.bamsoftware.com/hacks/zipbomb/zblg.zip">zblg.zip</a> 10 MB → 281 TB<br>\n' +
        " </li>\n" +
        ' <li><a href="https://www.bamsoftware.com/hacks/zipbomb/zbxl.zip">zbxl.zip</a> 46 MB → 4.5 PB (Zip64, менее совместима с парсерами)</li>\n' +
        " </ul><br>\n" +
        " Исходный код:<br>\n" +
        ' <pre>git clone https://www.bamsoftware.com/git/zipbomb.git</pre><a href="https://www.bamsoftware.com/hacks/zipbomb/zipbomb-20190702.zip">zipbomb-20190702.zip</a><br>\n' +
        " <br>\n" +
        " Данные и исходники иллюстраций:<br>\n" +
        ' <pre>git clone https://www.bamsoftware.com/git/zipbomb-paper.git</pre> <a href="https://habr.com/ru/post/459254/?utm_source=habrahabr&amp;utm_medium=rss&amp;utm_campaign=459254#habracut">Читать дальше →'
    },
    {
      title: "Security Week 28: взлом умного дома",
      visited: false,
      visible: false,
      date: "Mon, 08 Jul 2019 17:29:54 GMT",
      description:
        '<img src="https://habrastorage.org/webt/jb/f0/or/jbf0ork45cxrjax-puw3f0w6wtg.jpeg" align="right">Какие риски мы берем на себя, устанавливая систему «умный дом»? Ту, что рулит лампочками и чайником с приложения на смартфоне, внутри локальной сети и удаленно. Если на умную систему завязана безопасность и управление замками (как в случае Amazon Key) — то понятно какие. Если нет, то теоретически можно представить опасность программного вывода из строя какой-нибудь кофеварки с последующим пожаром. Но лучше не фантазировать, а знать наверняка. <br>\n' +
        " <br>\n" +
        ' Специалисты команды ICS CERT из «Лаборатории Касперского» решили провести натурный тест на умном доме одного из сотрудников компании (<a href="https://threatpost.ru/kaspersky-pokes-holes-in-fibaro-smart-home/33332/">новость</a>, пост в <a href="https://www.kaspersky.ru/blog/hacking-things/23017/">блоге</a>, техническая <a href="https://securelist.ru/fibaro-smart-home/94294/">статья</a>). Взлом произошел успешно: кофеварка не пострадала, но контроль над системой получить удалось, пусть и с парой (вполне реалистичных) допущений в ходе эксперимента. Одним из неприятных последствий этой атаки стала утечка персональных данных: координаты дома и, что самое печальное, геолокация смартфона. Впрочем, эксперимент закончился на позитивной ноте: производитель системы умного дома успешно закрыл уязвимости. <br> <a href="https://habr.com/ru/post/459252/?utm_source=habrahabr&amp;utm_medium=rss&amp;utm_campaign=459252#habracut">Читать дальше →</a>'
    }
  ]);

  function onArrowClick(index) {
    posts[index].visited = true;
    posts[index].visible = !posts[index].visible;
    setPosts([...posts]);
  }
  return (
    <div
      css={css`
        background-color: white;
        height: 100%;
        display: flex;
        flex-direction: column;
      `}
    >
      <Search />
      {posts.map((post, index) => (
        <Post
          first={index === 0}
          key={index}
          title={post.title}
          visible={post.visible}
          visited={post.visited}
          date={post.date}
          description={post.description}
          onArrowClick={() => onArrowClick(index)}
        />
      ))}
    </div>
  );
}

export default Posts;
