class MinimalHNComments extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.itemId = this.getAttribute('itemId');
        this.maxVisible = 3; // numero di commenti visibili inizialmente
        
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
                }
                .hn-title {
                    font-size: 1.2em;
                    font-weight: bold;
                }
                .hn-link {
                    color: blue;
                    text-decoration: underline;
                    cursor: pointer;
                    font-size: 0.9em;
                }
                .hn-link:hover {
                    color: blue;
                }
                .load-btn {
                    background: white;
                    border: 1px solid #000;
                    padding: 10px 20px;
                    cursor: pointer;
                    font-family: inherit;
                    font-size: 1em;
                }
                .load-btn:hover {
                    background: #f0f0f0;
                }
                .loading {
                    text-align: center;
                    color: #666;
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
                .reply {
                    margin-left: 30px;
                    margin-top: 10px;
                    border-left-color: #bbb;
                }
                .fade-overlay {
                    position: relative;
                    overflow: hidden;
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
                .expand-btn {
                    text-align: center;
                    margin: 20px 0;
                }
                .expand-btn button {
                    background: white;
                    border: 1px solid #000;
                    padding: 10px 30px;
                    cursor: pointer;
                    font-family: inherit;
                    font-size: 1em;
                }
                .expand-btn button:hover {
                    background: #f0f0f0;
                }
                .hidden {
                    display: none;
                }
                .no-comments {
                    text-align: center;
                    color: #666;
                    margin: 20px 0;
                }
            </style>
            
            <div class="hn-container">
                
                <div class="load-section">
                    <button class="load-btn" id="load-btn">load comments</button>
                </div>
                
                <div class="loading hidden" id="loading">loading...</div>
                <div class="no-comments hidden" id="no-comments">no comments yet</div>
                
                <div id="comments-container"></div>
                
                <div class="expand-btn hidden" id="expand-section">
                    <button id="expand-btn">show all comments</button>
                </div>
            </div>
        `;
        
        this.loadBtn = this.shadow.getElementById('load-btn');
        this.loadSection = this.shadow.querySelector('.load-section');
        this.loading = this.shadow.getElementById('loading');
        this.noComments = this.shadow.getElementById('no-comments');
        this.container = this.shadow.getElementById('comments-container');
        this.expandSection = this.shadow.getElementById('expand-section');
        this.expandBtn = this.shadow.getElementById('expand-btn');
        
        this.loadBtn.addEventListener('click', () => this.loadComments());
        this.expandBtn.addEventListener('click', () => this.expandComments());
    }
    
    async loadComments() {
        this.loadSection.classList.add('hidden');
        this.loading.classList.remove('hidden');
        
        try {
            const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${this.itemId}.json`);
            const data = await response.json();
            
            if (!data.kids || data.kids.length === 0) {
                this.loading.classList.add('hidden');
                this.noComments.classList.remove('hidden');
                return;
            }
            
            this.allComments = [];
            await this.fetchComments(data.kids);
            
            this.loading.classList.add('hidden');
            this.renderComments();
        } catch (error) {
            console.error('Error loading comments:', error);
            this.loading.textContent = 'error loading comments';
        }
    }
    
    async fetchComments(ids) {
        for (const id of ids) {
            try {
                const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
                const comment = await response.json();
                
                if (comment && !comment.deleted && comment.text) {
                    this.allComments.push(comment);
                    
                    if (comment.kids) {
                        await this.fetchComments(comment.kids);
                    }
                }
            } catch (error) {
                console.error('Error fetching comment:', error);
            }
        }
    }
    
    renderComments(showAll = false) {
        this.container.innerHTML = '';
        
        const commentsToShow = showAll ? this.allComments : this.allComments.slice(0, this.maxVisible);
        
        if (!showAll && this.allComments.length > this.maxVisible) {
            this.container.classList.add('fade-overlay');
            this.expandSection.classList.remove('hidden');
        } else {
            this.container.classList.remove('fade-overlay');
            this.expandSection.classList.add('hidden');
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
    
    expandComments() {
        this.renderComments(true);
    }
}

customElements.define('hn-comments', MinimalHNComments);
