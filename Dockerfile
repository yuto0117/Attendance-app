# 1. PHPのインストールとLaravel環境を準備
# 1. Apache + PHP 8.2
FROM php:8.2-apache

# 2. 必要なパッケージをインストール
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
WORKDIR /var/www/html
COPY . /var/www/html
COPY ./apache/default.conf /etc/apache2/sites-enabled/000-default.conf



RUN composer install --no-dev --optimize-autoloader


RUN php artisan config:cache && php artisan route:cache


# 5. Node.jsとNPMのインストール
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get -y install nodejs

COPY package*.json ./
RUN npm install
RUN npm run build

# 6. 権限設定
RUN chmod -R 775 storage bootstrap/cache
RUN chown -R www-data:www-data storage bootstrap/cache

# 7. Laravelのマイグレーション
RUN php artisan migrate --force

# 8. Apache の設定
RUN a2enmod rewrite

# 9. ポートを開放
EXPOSE 80

# 10. Apache を起動
CMD ["apache2-foreground"]