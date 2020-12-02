<h1 align="center">Exercism Readme Stats</h1>
<p align="center">Get dynamically generated Exercism stats on your readmes!</p>

## Features

Copy-paste this into your markdown content.

Simply change the username to your Exercism username.

```md
[![Andrew's Exercism stats](https://exercism-badges.vercel.app/api?username=andrewbaldwin44)](https://exercism.io/profiles/andrewbaldwin44)
```

[![Andrew's Exercism stats](https://exercism-badges.vercel.app/api?username=andrewbaldwin44)](https://exercism.io/profiles/andrewbaldwin44)

## Customize the Badge

### Themes

Use `?theme=THEME_NAME` parameter to set a theme for the card.

```md
[![Andrew's Exercism stats](https://exercism-badges.vercel.app/api?username=andrewbaldwin44&theme=monokai)](https://exercism.io/profiles/andrewbaldwin44)
```

You can checkout the [theme config file](./server/theme.js) for all available themes.

Alternatively, the badge can be styled using query params:
- `title_color` - Card's title color (hex code - no '#')
- `text_color` - Body text color (hex code  - no '#')
- `bg_color` - Card's background color (hex code  - no '#') or a gradient in the form of angle,start,end
- `hide_border` - Hides the card's border (boolean)
- `line_height` - Sets the line height (number), the default being 25
- `custom_title` - Sets a custom title for the card
- `disable_animations` - Turns off animations
- `cache_seconds` - set the cache header manually (min: 1800, max: 86400)

> Gradient bg_color example: `&bg_color=DEG,COLOR1,COLOR2,COLOR3...COLOR10`

### Exercises to Show

Use the `?amount=AMOUNT` parameter to set the number of exercises to show. Setting the amount to zero will hide this stat.

```md
[![Andrew's Exercism stats](https://exercism-badges.vercel.app/api?username=andrewbaldwin44&amount=2)](https://exercism.io/profiles/andrewbaldwin44)
```

### Hiding Stats

Any stat on the badge can be configured to hidden. Simply pass a query parameter `?hide=` with coma-separated values.

> Options: `&hide=stars,mentored,exercises`

The title can be hidden using the `hide_title=true` parameter.

### Contribute

Contributions are awesome and welcome! See [Issues](https://github.com/andrewbaldwin44/Exercism_Badges/issues) to report an issue / request a feature

This project was inspired by Anurag Hazra' [GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats).
