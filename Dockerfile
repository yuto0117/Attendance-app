# 1. PHPのインストールとLaravel環境を準備
FROM php:8.2-fpm

# 2. 必要な依存関係をインストール
RUN apt-get update && apt-get install -y \
    curl \
    zip \
    unzip \
    git \
    libonig-dev \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql mbstring

# 3. Composerのインストール
COPY --from=composer /usr/bin/composer /usr/bin/composer

# 4. Laravelの依存関係をインストール
WORKDIR /var/www
COPY . /var/www
RUN composer install --no-dev --optimize-autoloader

# 5. Node.jsとNPMのインストール
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get -y install nodejs



COPY package*.json ./

RUN npm install
RUN ls -l node_modules
# 7. Reactアプリをビルド
RUN npm run build

# 8. Reactのビルド結果を Laravel で表示するための設定
# (Inertia.jsで直接フロントエンドがレンダリングされるため、特に `public` にコピーはしない)

# 9. Laravelの開発サーバーを起動
CMD php artisan serve --host=0.0.0.0 --port=8080

# 10. ポートを開放
EXPOSE 8080