const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = 3000;

const host = `http://localhost:${port}`;

app.get(["/", "/user-lookup"], (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Lookup</title>
    <link rel="icon" href="data:image/png;base64,iVBORw0KGgo=">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            -webkit-text-size-adjust: none;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
        }

        .container {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 40px;
            width: 300px;
        }

        h1 {
            text-align: center;
            color: #333;
        }

        label {
            display: block;
            margin-bottom: 10px;
            color: #555;
        }

        input[type="text"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        input[type="submit"] {
            background-color: #0073e6;;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
        }

        input[type="submit"]:hover {
            background-color: #0059b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>User Lookup</h1>
        <form action="/search" method="get">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username">
            <input type="submit" value="Submit">
        </form>
    </div>
</body>
</html>
  `);


});


const fetchProfiles = async (username, host, endpoints) => {
  const promises = endpoints.map(endpoint =>
    fetch(`${host}/${endpoint}?username=${username}`).then(response => response.text())
  );
  return Promise.all(promises);
};

const createProfileLinks = (username, values, endpoints) => {
  const urls = {
    "search_aboutme": `https://about.me/${username}`,
    "search_allrecipes": `https://allrecipes.com/cook/${username}/`,
    "search_anime-planet": `https://anime-planet.com/users/${username}`,
    "search_behance": `https://behance.net/${username}`,
    "search_boardgamegeek": `https://boardgamegeek.com/user/${username}`,
    "search_buzzfeed": `https://buzzfeed.com/${username}`,
    "search_cnet": `https://cnet.com/profiles/${username}`,
    "search_cnn": `https://edition.cnn.com/profiles/${username}`,
    "search_codecademy": `https://discuss.codecademy.com/u/${username}`,
    "search_coursera": `https://coursera.org/instructor/${username}`,
    "search_dailymotion": `https://dailymotion.com/${username}`,
    "search_deviantart": `https://deviantart.com/${username}`,
    "search_discussions_apple": `https://discussions.apple.com/profile/${username}`,
    "search_douban": `https://douban.com/people/${username}`,
    "search_dribbble": `https://dribbble.com/${username}`,
    "search_ebay": `https://ebay.com/usr/${username}`,
    "search_flickr": `https://flickr.com/people/${username}`,
    "search_gaana": `https://gaana.com/artist/${username}`,
    "search_github": `https://github.com/${username}`,
    "search_goodreads": `https://goodreads.com/${username}`,
    "search_habr": `https://habr.com/en/users/${username}`,
    "search_imdb": `https://imdb.com/user/${username}`,
    "search_instagram": `https://instagram.com/${username}`,
    "search_kompasiana": `https://kompasiana.com/${username}`,
    "search_lastfm": `https://last.fm/user/${username}`,
    "search_livejournal": `https://livejournal.com/users/${username}`,
    "search_medium": `https://medium.com/@${username}`,
    "search_mercadolivre": `https://mercadolivre.com.br/perfil/${username}`,
    "search_pakwheels": `https://pakwheels.com/forums/users/${username}`,
    "search_paypal": `https://paypal.com/paypalme/${username}`,
    "search_pinterest": `https://pinterest.com/${username}`,
    "search_pornhub": `https://pornhub.com/users/${username}`,
    "search_producthunt": `https://producthunt.com/@${username}`,
    "search_quora": `https://quora.com/profile/${username}`,
    "search_reddit": `https://reddit.com/user/${username}`,
    "search_snapchat": `https://snapchat.com/add/${username}`,
    "search_soundcloud": `https://soundcloud.com/${username}`,
    "search_spotify": `https://open.spotify.com/user/${username}`,
    "search_telegram": `https://t.me/${username}`,
    "search_theguardian": `https://theguardian.com/profile/${username}`,
    "search_tieba": `https://tieba.baidu.com/home/main?un=${username}`,
    "search_tiktok": `https://tiktok.com/@${username}`,
    "search_tumblr": `https://tumblr.com/${username}`,
    "search_twitch": `https://twitch.tv/${username}`,
    "search_vice": `https://vice.com/en/contributor/${username}`,
    "search_vimeo": `https://vimeo.com/${username}`,
    "search_wikipedia": `https://wikipedia.org/wiki/User:${username}`,
    "search_wordpress": `https://wordpress.org/support/users/${username}`,
    "search_xvideos": `https://xvideos.com/profiles/${username}`,
    "search_youtube": `https://youtube.com/@${username}`
  };

  const sites = [];

  endpoints.forEach((endpoint, index) => {
    if (values[index] === "true") {
      const url = urls[endpoint];
      const domain = (new URL(url)).hostname;
      sites.push(`<a href="${url}">${domain}</a>`);
    }
  });

  return sites;
};

app.get("/search", async (req, res) => {
  const username = req.query.username;
  const endpoints = [
    "search_aboutme",
    "search_allrecipes",
    "search_anime-planet",
    "search_behance",
    "search_boardgamegeek",
    "search_buzzfeed",
    "search_cnet",
    "search_cnn",
    "search_codecademy",
    "search_coursera",
    "search_dailymotion",
    "search_deviantart",
    "search_discussions_apple",
    "search_douban",
    "search_dribbble",
    "search_ebay",
    "search_flickr",
    "search_gaana",
    "search_github",
    "search_goodreads",
    "search_habr",
    "search_imdb",
    "search_instagram",
    "search_kompasiana",
    "search_lastfm",
    "search_livejournal",
    "search_medium",
    "search_mercadolivre",
    "search_pakwheels",
    "search_paypal",
    "search_pinterest",
    "search_pornhub",
    "search_producthunt",
    "search_quora",
    "search_reddit",
    "search_snapchat",
    "search_soundcloud",
    "search_spotify",
    "search_telegram",
    "search_theguardian",
    "search_tieba",
    "search_tiktok",
    "search_tumblr",
    "search_twitch",
    "search_vice",
    "search_vimeo",
    "search_wikipedia",
    "search_wordpress",
    "search_xvideos",
    "search_youtube"
  ];

  try {
    const values = await fetchProfiles(username, host, endpoints);
    const sites = createProfileLinks(username, values, endpoints);

    res.send(`
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
      padding: 20px;
      background-color: #f4f4f4;
      -webkit-text-size-adjust: none;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }
    h1 {
      color: #333;
    }
    a {
      display: block;
      margin: 10px 0;
      color: #0073e6;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    textarea {
      width: 70%;
      height: 200px;
      margin-top: 20px;
      padding: 10px;
      font-size: 16px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      resize: none;
    }
    .button-container {
      margin-top: 10px;
    }
    .format-button {
      padding: 8px 16px;
      margin-right: 10px;
      background-color: #0073e6;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .format-button:hover {
      background-color: #005aa7;
    }
  </style>
</head>
<body>
  <h1>Results for ${username}</h1>
  ${sites.length > 0 ? sites.join("") : "<p>No profiles found.</p>"}
  <textarea id="resultsTextarea" placeholder="Results" readonly>${sites.map(site => {
    const hrefStartIndex = site.indexOf("href=\"") + 6;
    const hrefEndIndex = site.indexOf("\">");
    return site.substring(hrefStartIndex, hrefEndIndex);
  }).join("\n")}</textarea>
  <div class="button-container">
    <button class="format-button" onclick="formatDefault()">Default</button>
    <button class="format-button" onclick="formatCSV()">CSV</button>
    <button class="format-button" onclick="formatJSON()">JSON</button>
    <button class="format-button" onclick="formatHTML()">HTML</button>
    <button class="format-button" onclick="formatMarkdown()">Markdown</button>
    <button class="format-button" onclick="downloadFile()">Download</button>
  </div>

  <script>
    const originalValue = document.getElementById('resultsTextarea').value;

    function formatDefault() {
      document.getElementById('resultsTextarea').value = originalValue;
    }

    function formatCSV() {
      formatDefault();
      const textarea = document.getElementById('resultsTextarea');
      const urls = textarea.value.split('\\n');
      const formatted = urls.map(url => \`"\${url}"\`).join(',\\n');
      textarea.value = formatted;
    }

    function formatJSON() {
      formatDefault();
      const textarea = document.getElementById('resultsTextarea');
      const urls = textarea.value.split('\\n');
      const json = JSON.stringify(urls, null, 2);
      textarea.value = json;
    }

    function formatHTML() {
      formatDefault();
      const textarea = document.getElementById('resultsTextarea');
      const urls = textarea.value.split('\\n').map(url => \`<a href="\${url}">\${url}</a>\`).join('\\n');
      textarea.value = urls;
    }

    function formatMarkdown() {
      formatDefault();
      const textarea = document.getElementById('resultsTextarea');
      const urls = textarea.value.split('\\n').map(url => {
        const domain = (new URL(url)).hostname;
        return \`[\${domain}](\${url})\`;
      }).join('\\n');
      textarea.value = urls;
    }

    function downloadFile() {
      const text = document.getElementById('resultsTextarea').value;
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', prompt('Enter file name and extension (e.g. elon_musk_accounts.json)'));
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  </script>
</body>
</html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

const fetchStatus = async (url, req, res) => {
  try {
    const response = await fetch(`${url}${req.query.username}`);
    res.send(response.status === 200 ? "true" : "false");
  } catch (error) {
    res.send("false");
  }
};

const fetchStatusWithCallback = async (url, req, res, callback) => {
  try {
    const response = await fetch(`${url}${req.query.username}`);
    callback(response);
  } catch (error) {
    res.send("false");
  }
};

const fetchText = async (url, req, res, callback) => {
  try {
    const response = await fetch(`${url}${req.query.username}`);
    const text = await response.text();
    callback(text); 
  } catch (error) {
    res.send("false");
  }
};

const appGet = (path, handler) => app.get(path, (req, res) => handler(req, res));

const searchHandlers = {
  "/search_aboutme": (req, res) => fetchStatus("https://about.me/", req, res),
  "/search_allrecipes": (req, res) => fetchStatus("https://www.allrecipes.com/cook/", req, res),
  "/search_anime-planet": (req, res) => fetchText("https://www.anime-planet.com/users/", req, res, (response) => {
    res.send(new RegExp(`<a\\s+href="/users/${req.query.username}/following">`, "gi").test(response) ? "true" : "false");
  }),
  "/search_behance": (req, res) => fetchStatus("https://www.behance.net/", req, res),
  "/search_boardgamegeek": (req, res) => fetchText("https://boardgamegeek.com/user/", req, res, (response) => {
    res.send(new RegExp(`Error: User does not exist`, "gi").test(response) ? "false" : "true");
  }),
  "/search_buzzfeed": (req, res) => fetchText("https://www.buzzfeed.com/", req, res, (response) => {
    res.send(new RegExp(`joined`, "gi").test(response) && new RegExp(`trophies`, "gi").test(response) ? "true" : "false");
  }),
  "/search_cnet": (req, res) => fetchStatus("https://www.cnet.com/profiles/", req, res),
  "/search_cnn": (req, res) => fetchStatus("https://edition.cnn.com/profiles/", req, res),
  "/search_codecademy": (req, res) => fetchStatus("https://discuss.codecademy.com/u/", req, res),
  "/search_coursera": (req, res) => fetchStatus("https://www.coursera.org/instructor/", req, res),
  "/search_dailymotion": (req, res) => fetchStatus("https://www.dailymotion.com/", req, res),
  "/search_deviantart": (req, res) => fetchStatus("https://www.deviantart.com/", req, res),
  "/search_discussions_apple": (req, res) => fetchText("https://discussions.apple.com/profile/", req, res, (response) => {
    res.send(new RegExp(`user-profile-name`, "gi").test(response) ? "true" : "false");
  }),
  "/search_douban": (req, res) => fetchStatus("https://www.douban.com/people/", req, res),
  "/search_dribbble": (req, res) => fetchStatus("https://dribbble.com/", req, res),
  "/search_ebay": (req, res) => fetchText("https://www.ebay.com/usr/", req, res, (response) => {
    res.send(new RegExp(`Member since`, "gi").test(response) ? "true" : "false");
  }),
  "/search_flickr": (req, res) => fetchStatus("https://www.flickr.com/people/", req, res),
  "/search_gaana": (req, res) => fetchStatus("https://gaana.com/artist/", req, res),
  "/search_github": (req, res) => fetchStatus("https://github.com/", req, res),
  "/search_goodreads": (req, res) => fetchStatusWithCallback("https://www.goodreads.com/", req, res, (response) => {
    res.send(response.status === 200 && response.redirected === true ? "true" : "false");
  }),
  "/search_habr": (req, res) => fetchStatus("https://habr.com/en/users/", req, res),
  "/search_imdb": async (req, res) => {
    const username = req.query.username;
    try {
      const response = await fetch(`https://html.duckduckgo.com/html?q=site:imdb.com%20%2B%20%22user%22%20%2B%20%22ur%22%20${username}%20-%22title%22`);
      const text = await response.text();
      res.send(new RegExp(`<a[^>]+>${username}\&\#x27\;s Profile - IMDb</a>`, "gi").test(text) ? "true" : "false");
    } catch (error) {
      res.send("false");
    }
  },
  "/search_instagram": (req, res) => fetchText("https://www.instagram.com/", req, res, (response) => {
    res.send(response.match(/httpErrorPage/g).length > 1 ? "false" : "true");
  }),
  "/search_kompasiana": (req, res) => fetchStatus("https://www.kompasiana.com/", req, res),
  "/search_lastfm": (req, res) => fetchStatus("https://www.last.fm/user/", req, res),
  "/search_livejournal": (req, res) => fetchStatus("https://www.livejournal.com/users/", req, res),
  "/search_medium": (req, res) => fetchText("https://medium.com/@", req, res, (response) => {
    res.send(new RegExp(`followers`, "gi").test(response) ? "true" : "false");
  }),
  "/search_mercadolivre": (req, res) => fetchStatus("https://www.mercadolivre.com.br/perfil/", req, res),
  "/search_pakwheels": (req, res) => fetchStatus("https://www.pakwheels.com/forums/users/", req, res),
  "/search_paypal": (req, res) => fetchText("https://www.paypal.com/paypalme/", req, res, (response) => {
    res.send(new RegExp(`"paypalmeSlugName":"${req.query.username}"`, "gi").test(response) ? "true" : "false");
  }),
  "/search_pinterest": (req, res) => fetchText("https://www.pinterest.com/", req, res, (response) => {
    res.send(new RegExp(`user not found`, "gi").test(response) ? "false" : "true");
  }),
  "/search_pornhub": (req, res) => fetchStatus("https://www.pornhub.com/users/", req, res),
  "/search_producthunt": (req, res) => fetchStatus("https://www.producthunt.com/@", req, res),
  "/search_quora": (req, res) => fetchText("https://www.quora.com/profile/", req, res, (response) => {
    res.send(new RegExp(`numFollowers`, "gi").test(response) ? "true" : "false");
  }),
  "/search_reddit": (req, res) => fetchText("https://www.reddit.com/user/", req, res, (response) => {
    res.send(new RegExp(`Sorry, nobody on Reddit goes by that name.`, "gi").test(response) ? "false" : "true");
  }),
  "/search_snapchat": (req, res) => fetchStatus("https://www.snapchat.com/add/", req, res),
  "/search_soundcloud": (req, res) => fetchStatus("https://soundcloud.com/", req, res),
  "/search_spotify": (req, res) => fetchStatus("https://open.spotify.com/user/", req, res),
  "/search_telegram": (req, res) => fetchText("https://t.me/", req, res, (response) => {
    res.send(new RegExp(`tgme_page_title`, "gi").test(response) ? "true" : "false");
  }),
  "/search_theguardian": (req, res) => fetchStatus("https://www.theguardian.com/profile/", req, res),
  "/search_tieba": (req, res) => fetchStatusWithCallback("https://tieba.baidu.com/home/main?un=", req, res, (responseObject) => {
    res.send(responseObject.status === 200 && responseObject.redirected === false ? "true" : "false");
  }),
  "/search_tiktok": (req, res) => fetchText("https://www.tiktok.com/@", req, res, (response) => {
    res.send(new RegExp(`"uniqueId":"${req.query.username}"`, "gi").test(response) ? "true" : "false");
  }),
  "/search_tumblr": (req, res) => fetchStatus("https://www.tumblr.com/", req, res),
  "/search_twitch": (req, res) => fetchText("https://m.twitch.tv/", req, res, (response) => {
    res.send(new RegExp(`profile_image`, "gi").test(response) ? "true" : "false");
  }),
  "/search_vice": (req, res) => fetchStatus("https://www.vice.com/en/contributor/", req, res),
  "/search_vimeo": (req, res) => fetchStatus("https://vimeo.com/", req, res),
  "/search_wikipedia": (req, res) => fetchText("https://en.wikipedia.org/wiki/User:", req, res, (response) => {
    res.send(new RegExp(`is not registered on this wiki`, "gim").test(response) || new RegExp(`Wikipedia does not have a`, "gim").test(response) ? "false" : "true");
  }),
  "/search_wordpress": (req, res) => fetchStatus("https://wordpress.org/support/users/", req, res),
  "/search_xvideos": (req, res) => fetchStatus("https://www.xvideos.com/profiles/", req, res),
  "/search_youtube": (req, res) => fetchStatus("https://www.youtube.com/@", req, res, null),
}


for (const [path, handler] of Object.entries(searchHandlers)) {
  appGet(path, handler);
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})
