import React from 'react';

interface ArticleContentProps {
  content?: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  // HTML içeriğini güvenli bir şekilde render et
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  // Plain text'i HTML'e çevir
  const convertPlainTextToHTML = (plainText: string) => {
    if (!plainText) return '';
    
    // Önce mevcut HTML tag'lerini koru
    let htmlContent = plainText;
    
    // Eğer zaten HTML içeriyorsa, sadece class'ları ekle
    if (htmlContent.includes('<')) {
      return htmlContent
        .replace(/<h1>/g, '<h1 class="article-heading-1">')
        .replace(/<h2>/g, '<h2 class="article-heading-2">')
        .replace(/<h3>/g, '<h3 class="article-heading-3">')
        .replace(/<h4>/g, '<h4 class="article-heading-4">')
        .replace(/<p>/g, '<p class="article-paragraph">')
        .replace(/<ul>/g, '<ul class="article-list">')
        .replace(/<ol>/g, '<ol class="article-list">')
        .replace(/<li>/g, '<li class="article-list-item">')
        .replace(/<strong>/g, '<strong class="article-strong">')
        .replace(/<em>/g, '<em class="article-em">')
        .replace(/<a /g, '<a class="article-link" ')
        .replace(/<blockquote>/g, '<blockquote class="article-blockquote">')
        .replace(/<table>/g, '<table class="article-table">')
        .replace(/<th>/g, '<th class="article-table-header">')
        .replace(/<td>/g, '<td class="article-table-cell">')
        .replace(/<code>/g, '<code class="article-code">')
        .replace(/<pre>/g, '<pre class="article-pre">')
        .replace(/<pre><code>/g, '<pre class="article-pre"><code class="article-code-inline">');
    }
    
    // Plain text ise, line break'leri paragraf'a çevir
    return htmlContent
      // Çift line break'leri paragraf'a çevir
      .split(/\n\s*\n/)
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0)
      .map(paragraph => {
        // Tek line break'leri <br> tag'ine çevir
        const withBreaks = paragraph.replace(/\n/g, '<br>');
        return `<p class="article-paragraph">${withBreaks}</p>`;
      })
      .join('\n');
  };

  // Eğer içerik yoksa placeholder göster
  if (!content) {
    return (
      <div className="article-content">
        <div className="article-warning">
          <div className="article-warning-icon">
            <svg className="article-warning-svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="article-warning-text">
            <p className="article-warning-message">
              Bu makale için içerik henüz yüklenmemiş. Lütfen daha sonra tekrar kontrol edin.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="article-content">
      <div 
        dangerouslySetInnerHTML={createMarkup(convertPlainTextToHTML(content))}
        className="article-content-inner"
      />
    </div>
  );
} 