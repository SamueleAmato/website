class MinimalHNComments extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.itemId = this.getAttribute('itemId');
        this.maxVisible = 3;
        
        this.shadow.innerHTML = `
            <style>
                * {
                    font-family: "Times New Roman", Times, serif;
                }
                .hn-container {
                    max-width: 650px;
                    margin: 40px auto;
                }
                .hn-header {
                    text-align: center;
                    margin-bottom: 20px;
                    font-size: 1.1em;
                }
                .loading {
                    text-align: center;
                    color: #666;
                    margin: 20px 0;
                }
                .comment {
                    margin: 20px 0;
                    padding: 15px;
                    border-left: 2px solid #ddd;
                    background: #fafafa;
                }
                .comment-author {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .comment-date {
                    color: #666;
                    font-size: 0.85em;
                    margin-bottom: 10px;
                }
                .comment-text {
                    line-height: 1.5;
                }
                .comment-text a {
                    color: blue;
                    text-decoration: underline;
                }
                .fade-overlay {
                    position: relative;
                    overflow: hidden;
                    max-height: 600px;
                }
                .fade-overlay::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 150px;
                    background: linear-gradient(transparent, white);
                    pointer-events: none;
                }
                .hn-link {
                    text-align: center;
                    margin: 30px 0;
                }
                .hn-link a {
                    color: blue;
                    text-decoration: underline;
                    font-size: 0.95em;
                }
                .hn-link a:visited {
                    color: purple;
                }
                .hn-link a:hover {
                    color: blue;
                }
                .hn-link a:active {
                    color: red;
                }
                .hidden {
                    display: none;
                }
            </style>
            
            <div class="hn-container">
                <div class="loading" id="loading">loading comments...</div>
                
                <div class="hidden" id="comments-section">
                    <div class="hn-header">comments</div>
                    <div id="comments-container"></div>
                    <div class="hn-link" id="hn-link">
                        <a href="https://news.ycombinator.com/item?id=${this.itemId}" target="_blank">
                            see full discussion on hacker news ↗
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        this.loading = this.shadow.getElementById('loading');
        this.commentsSection = this.shadow.getElementById('comments-section');
        this.container = this.shadow.getElementById('comments-container');
        this.hnLink = this.shadow.getElementById('hn-link');
    }
    
    connectedCallback() {
        this.loadComments();
    }
    
    async loadComments() {
        try {
            const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${this.itemId}.json`);
            const data = await response.json();
            
            if (!data.kids || data.kids.length === 0) {
                // Nascondi tutto se non ci sono commenti
                this.shadow.querySelector('.hn-container').innerHTML = '';
                return;
            }
            
            this.allComments = [];
            await this.fetchComments(data.kids);
            
            if (this.allComments.length === 0) {
                // Nascondi tutto se non ci sono commenti validi
                this.shadow.querySelector('.hn-container').innerHTML = '';
                return;
            }
            
            this.loading.classList.add('hidden');
            this.commentsSection.classList.remove('hidden');
            this.renderComments();
        } catch (error) {
            console.error('Error loading comments:', error);
            // Nascondi tutto in caso di errore
            this.shadow.querySelector('.hn-container').innerHTML = '';
        }
    }
    
    async fetchComments(ids) {
        for (const id of ids) {
            try {
                const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
                const comment = await response.json();
                
                if (comment && !comment.deleted && comment.text) {
                    this.allComments.push(comment);
                    
                    if (comment.kids && this.allComments.length < 10) {
                        await this.fetchComments(comment.kids);
                    }
                }
            } catch (error) {
                console.error('Error fetching comment:', error);
            }
        }
    }
    
    renderComments() {
        this.container.innerHTML = '';
        
        const commentsToShow = this.allComments.slice(0, this.maxVisible);
        
        if (this.allComments.length > this.maxVisible) {
            this.container.classList.add('fade-overlay');
        }
        
        commentsToShow.forEach(comment => {
            const commentEl = this.createCommentElement(comment);
            this.container.appendChild(commentEl);
        });
    }
    
    createCommentElement(comment) {
        const div = document.createElement('div');
        div.className = 'comment';
        
        const date = new Date(comment.time * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        div.innerHTML = `
            <div class="comment-author">${comment.by || 'deleted'}</div>
            <div class="comment-date">${date}</div>
            <div class="comment-text">${comment.text || 'comment deleted'}</div>
        `;
        
        return div;
    }
}

customElements.define('hn-comments', MinimalHNComments);
