/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useState } from "react";
import Search from "../components/Search";
import Post from "../components/Post";

function Posts() {
  const [posts, setPosts] = useState([
    {
      title: "[Перевод] Ещё лучшая ZIP-бомба ]]",
      visited: false,
      date: "Mon, 08 Jul 2019 18:52:10 GMT",
      image: "",
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
      title: "[Перевод] Ещё лучшая ZIP-бомба ]]",
      visited: false,
      date: "Mon, 08 Jul 2019 18:52:10 GMT",
      image: "",
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
    }
  ]);
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
          visible={post.visited}
          date={post.date}
          image={post.image}
          description={post.description}
        />
      ))}
    </div>
  );
}

export default Posts;
