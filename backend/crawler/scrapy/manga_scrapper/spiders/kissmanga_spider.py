import scrapy

class KissMangaSpider(scrapy.Spider):
    name="manga"

    def start_requests(self):
        urls = [
            'https://www.mangaeden.com/en/en-directory',
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        for td in response.css('#mangaList td'):
            yield {
                'url': td.css('a::attr(href)').extract_first(),
                'name': td.css('a::text').extract_first()
            }