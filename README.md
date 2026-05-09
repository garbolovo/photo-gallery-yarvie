# Photo Gallery

Статический сайт-галерея для GitHub Pages.

## Как добавить фото и видео

1. Скопируйте файлы в папку `media`.
2. Запустите:

```bash
node scripts/build-media-list.mjs
```

3. Запустите локальный сервер и проверьте галерею:

```bash
python3 -m http.server 8080
```

После этого откройте `http://localhost:8080`.

Поддерживаемые форматы: `jpg`, `jpeg`, `png`, `gif`, `webp`, `avif`, `mp4`, `webm`, `mov`, `m4v`.

## Публикация на GitHub Pages

1. Создайте репозиторий на GitHub.
2. Загрузите содержимое этой папки в репозиторий.
3. В настройках репозитория откройте `Settings` -> `Pages`.
4. В `Build and deployment` выберите `Deploy from a branch`.
5. Выберите ветку `main` и папку `/root`.

После публикации GitHub покажет ссылку на сайт.
