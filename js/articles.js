// Article System for CAS Website
class ArticleSystem {
    constructor() {
        this.articles = [];
        this.videos = [];
        this.categories = [
            'STEM', 
            'Social Studies', 
            'Politics', 
            'Philosophy', 
            'Art & Literature', 
            'Women Rights',
            'Science & Technology'
        ];
        this.init();
    }

    async init() {
        await this.loadArticles();
        await this.loadVideos();
        this.renderLatestArticles();
        this.renderLatestVideos();
    }

    async loadArticles() {
        try {
            // Firestore'dan published articles çek
            const q = firebase.firestore().collection('articles')
                .where('status', '==', 'published')
                .orderBy('publishedAt', 'desc');
                
            const snapshot = await q.get();
            
            this.articles = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            console.log('Articles loaded:', this.articles);
        } catch (error) {
            console.error('Error loading articles:', error);
            this.articles = []; // Fallback to empty array
        }
    }

    async loadVideos() {
        try {
            // Firestore'dan published videos çek
            const q = firebase.firestore().collection('videos')
                .where('status', '==', 'published')
                .orderBy('publishedAt', 'desc');
                
            const snapshot = await q.get();
            
            this.videos = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            console.log('Videos loaded:', this.videos);
        } catch (error) {
            console.error('Error loading videos:', error);
            this.videos = []; // Fallback to empty array
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    createArticleCard(article) {
        const authorName = typeof article.author === 'string' ? article.author : 'Unknown Author';
        
        return `
            <div class="article-card" data-id="${article.id}">
                <div class="article-image">
                    <img src="${article.featuredImage || '/images/default-article.jpg'}" alt="${article.title}">
                    <div class="article-category">${article.category}</div>
                    ${article.isEditorsPick ? '<div class="editors-pick">Editor\'s Pick</div>' : ''}
                </div>
                <div class="article-content">
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-meta">
                        <div class="article-author">
                            <i class="fas fa-user"></i>
                            <span>${authorName}</span>
                        </div>
                        <div class="article-date">
                            <i class="fas fa-calendar"></i>
                            <span>${this.formatDate(article.publishedAt)}</span>
                        </div>
                        <div class="article-read-time">
                            <i class="fas fa-clock"></i>
                            <span>${article.readTime} min read</span>
                        </div>
                    </div>
                    <div class="article-tags">
                        ${article.tags?.slice(0, 2).map(tag => `<span class="tag">${tag}</span>`).join('') || ''}
                    </div>
                </div>
            </div>
        `;
    }

    createVideoCard(video) {
        const youtubeId = this.extractYouTubeId(video.youtubeUrl);
        const thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
        
        return `
            <div class="video-card" data-id="${video.id}">
                <div class="video-thumbnail">
                    <img src="${thumbnail}" alt="${video.title}">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="video-category">${video.category}</div>
                    ${video.duration ? `<div class="video-duration">${video.duration}</div>` : ''}
                </div>
                <div class="video-content">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-description">${video.description}</p>
                    <div class="video-meta">
                        <div class="video-date">
                            <i class="fas fa-calendar"></i>
                            <span>${this.formatDate(video.publishedAt)}</span>
                        </div>
                        ${video.views ? `
                            <div class="video-views">
                                <i class="fas fa-eye"></i>
                                <span>${video.views.toLocaleString()} views</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    renderLatestArticles() {
        const container = document.getElementById('latest-articles-container');
        if (!container) return;

        if (this.articles.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-book-open"></i>
                    <h3>Henüz makale yok</h3>
                    <p>Yakında makaleler burada görünecek.</p>
                </div>
            `;
            return;
        }

        const articlesToShow = this.articles.slice(0, 6);
        container.innerHTML = articlesToShow.map(article => this.createArticleCard(article)).join('');
        
        // Add click handlers
        container.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', () => {
                const articleId = card.dataset.id;
                window.location.href = `article-detail.html?id=${articleId}`;
            });
        });
    }

    renderLatestVideos() {
        const container = document.getElementById('latest-videos-container');
        if (!container) return;

        if (this.videos.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-video"></i>
                    <h3>Henüz video yok</h3>
                    <p>Yakında videolar burada görünecek.</p>
                </div>
            `;
            return;
        }

        const videosToShow = this.videos.slice(0, 6);
        container.innerHTML = videosToShow.map(video => this.createVideoCard(video)).join('');
        
        // Add click handlers
        container.querySelectorAll('.video-card').forEach(card => {
            card.addEventListener('click', () => {
                const videoId = card.dataset.id;
                window.location.href = `video-detail.html?id=${videoId}`;
            });
        });
    }

    // Admin Functions
    async createArticle(articleData) {
        try {
            const docRef = await firebase.firestore().collection('articles').add({
                ...articleData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            console.log('Article created with ID:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('Error creating article:', error);
            throw error;
        }
    }

    async createVideo(videoData) {
        try {
            const youtubeId = this.extractYouTubeId(videoData.youtubeUrl);
            if (!youtubeId) {
                throw new Error('Invalid YouTube URL');
            }

            const videoWithMetadata = {
                ...videoData,
                youtubeId,
                thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await firebase.firestore().collection('videos').add(videoWithMetadata);
            console.log('Video created with ID:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('Error creating video:', error);
            throw error;
        }
    }

    async updateArticle(articleId, updates) {
        try {
            await firebase.firestore().collection('articles').doc(articleId).update({
                ...updates,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error('Error updating article:', error);
            throw error;
        }
    }

    async deleteArticle(articleId) {
        try {
            await firebase.firestore().collection('articles').doc(articleId).delete();
        } catch (error) {
            console.error('Error deleting article:', error);
            throw error;
        }
    }

    createSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize only if we're on a page that needs articles
    if (document.getElementById('latest-articles-container') || 
        document.getElementById('latest-videos-container') ||
        document.getElementById('all-articles-container') ||
        document.getElementById('all-videos-container')) {
        
        window.articleSystem = new ArticleSystem();
    }
});