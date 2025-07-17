// Social Proof Widgets - Vanilla JavaScript
// Production-ready social proof notification widgets

class SocialProofWidget {
    constructor(options = {}) {
        this.users = options.users || [];
        this.additionalCount = options.additionalCount || 0;
        this.productName = options.productName || 'this product';
        this.position = options.position || 'bottom-6 left-6';
        this.onClose = options.onClose || (() => {});
        this.onClick = options.onClick || (() => {});
        
        this.element = null;
        this.isVisible = false;
    }

    show() {
        if (this.isVisible) return;
        
        this.element = this.createElement();
        document.body.appendChild(this.element);
        this.isVisible = true;
        
        // Trigger animation
        setTimeout(() => {
            this.element.classList.add('animate-slide-in');
        }, 10);
    }

    hide() {
        if (!this.isVisible || !this.element) return;
        
        this.element.style.transform = 'translateX(-100%)';
        this.element.style.opacity = '0';
        
        setTimeout(() => {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
            this.element = null;
            this.isVisible = false;
        }, 300);
        
        this.onClose();
    }

    createElement() {
        const displayedUsers = this.users.slice(0, 3);
        const remainingCount = Math.max(0, this.users.length - 3 + this.additionalCount);
        
        const widget = document.createElement('div');
        widget.className = `widget-container ${this.position}`;
        
        widget.innerHTML = `
            <div class="relative bg-white rounded-xl shadow-lg border border-gray-200 p-4 pr-12 max-w-sm transform transition-all duration-300 ease-out cursor-pointer hover:scale-105 hover:shadow-xl">
                <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 close-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                
                <div class="flex items-center space-x-3">
                    <div class="flex items-center -space-x-2">
                        ${displayedUsers.map((user, index) => `
                            <div class="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden" style="z-index: ${displayedUsers.length - index}">
                                ${user.avatar ? 
                                    `<img src="${user.avatar}" alt="${user.name}" class="w-full h-full object-cover">` :
                                    `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">${user.initials}</div>`
                                }
                            </div>
                        `).join('')}
                        
                        ${remainingCount > 0 ? `
                            <div class="relative w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
                                +${remainingCount}
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="flex-1 min-w-0">
                        <p class="text-sm text-gray-800 leading-relaxed">
                            <span class="font-semibold text-teal-600">
                                ${this.formatUserNames()}${this.getAdditionalText()}
                            </span>
                            <span class="text-gray-700"> vouched for ${this.productName}...</span>
                        </p>
                    </div>
                </div>
                
                <div class="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
            </div>
        `;
        
        // Event listeners
        widget.querySelector('.close-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.hide();
        });
        
        widget.addEventListener('click', () => {
            this.onClick();
        });
        
        return widget;
    }

    formatUserNames() {
        const displayedUsers = this.users.slice(0, 3);
        if (displayedUsers.length === 0) return '';
        
        const names = displayedUsers.map(user => user.name);
        
        if (names.length === 1) {
            return names[0];
        } else if (names.length === 2) {
            return `${names[0]} & ${names[1]}`;
        } else {
            return `${names[0]}, ${names[1]} & ${names[2]}`;
        }
    }

    getAdditionalText() {
        const remainingCount = Math.max(0, this.users.length - 3 + this.additionalCount);
        if (remainingCount > 0) {
            return ` & ${remainingCount} other${remainingCount > 1 ? 's' : ''}`;
        }
        return '';
    }
}

class PurchaseNotificationWidget {
    constructor(options = {}) {
        this.customer = options.customer || {};
        this.productName = options.productName || 'Product';
        this.productImage = options.productImage || '';
        this.companyName = options.companyName || 'Company';
        this.review = options.review || null;
        this.position = options.position || 'bottom-6 right-6';
        this.onClose = options.onClose || (() => {});
        this.onFeedbackClick = options.onFeedbackClick || (() => {});
        
        this.element = null;
        this.isVisible = false;
        this.showReview = false;
    }

    show() {
        if (this.isVisible) return;
        
        this.element = this.createElement();
        document.body.appendChild(this.element);
        this.isVisible = true;
        
        setTimeout(() => {
            this.element.classList.add('animate-slide-in');
        }, 10);
    }

    hide() {
        if (!this.isVisible || !this.element) return;
        
        this.element.style.transform = 'translateX(100%)';
        this.element.style.opacity = '0';
        
        setTimeout(() => {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
            this.element = null;
            this.isVisible = false;
            this.showReview = false;
        }, 300);
        
        this.onClose();
    }

    createElement() {
        const widget = document.createElement('div');
        widget.className = `widget-container ${this.position}`;
        
        widget.innerHTML = this.getWidgetHTML();
        
        // Event listeners
        widget.querySelector('.close-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.hide();
        });
        
        const feedbackBtn = widget.querySelector('.feedback-btn');
        if (feedbackBtn) {
            feedbackBtn.addEventListener('click', () => {
                this.handleFeedbackClick();
            });
        }
        
        return widget;
    }

    getWidgetHTML() {
        if (!this.showReview) {
            return `
                <div class="relative bg-white rounded-xl shadow-lg border border-gray-200 w-72 transform transition-all duration-300 ease-out">
                    <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 close-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    
                    <div class="p-4 pr-8 space-y-4">
                        <div class="flex items-center space-x-3 mb-4">
                            <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                ${this.customer.avatar ? 
                                    `<img src="${this.customer.avatar}" alt="${this.customer.name}" class="w-full h-full object-cover">` :
                                    `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">${this.customer.initials}</div>`
                                }
                            </div>
                            
                            <div class="flex-1 min-w-0">
                                <p class="text-sm text-gray-800">
                                    <span class="font-semibold text-teal-600">${this.customer.name}</span>
                                    <span class="text-gray-700"> recently bought from </span>
                                    <span class="font-medium text-gray-800">${this.companyName}</span>
                                </p>
                            </div>
                        </div>

                        ${this.productImage ? `
                            <div class="flex items-center space-x-3 mb-4">
                                <div class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                    <img src="${this.productImage}" alt="${this.productName}" class="w-full h-full object-cover">
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-800 truncate">${this.productName}</p>
                                    <p class="text-xs text-gray-500">Product purchased</p>
                                </div>
                            </div>
                        ` : ''}

                        ${this.review ? `
                            <button class="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 feedback-btn">
                                Check Feedback Now
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="relative bg-white rounded-xl shadow-lg border border-gray-200 w-80 transform transition-all duration-300 ease-out animate-fade-in">
                    <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 close-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    
                    <div class="p-4 pr-8 space-y-4">
                        <div class="flex items-center space-x-3 mb-4">
                            <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                ${this.customer.avatar ? 
                                    `<img src="${this.customer.avatar}" alt="${this.customer.name}" class="w-full h-full object-cover">` :
                                    `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">${this.customer.initials}</div>`
                                }
                            </div>
                            
                            <div class="flex-1 min-w-0">
                                <p class="text-sm text-gray-800">
                                    <span class="font-semibold text-teal-600">${this.customer.name}</span>
                                    <span class="text-gray-700"> recently bought from </span>
                                    <span class="font-medium text-gray-800">${this.companyName}</span>
                                </p>
                            </div>
                        </div>

                        ${this.productImage ? `
                            <div class="flex items-center space-x-3 mb-4">
                                <div class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                    <img src="${this.productImage}" alt="${this.productName}" class="w-full h-full object-cover">
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-800 truncate">${this.productName}</p>
                                    <p class="text-xs text-gray-500">Product purchased</p>
                                </div>
                            </div>
                        ` : ''}

                        <div class="space-y-3">
                            <div class="flex items-center space-x-1">
                                ${this.renderStars(this.review.rating)}
                            </div>
                            
                            <blockquote class="text-sm text-gray-700 leading-relaxed">
                                "${this.review.text}"
                            </blockquote>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    renderStars(rating) {
        return Array.from({ length: 5 }, (_, index) => {
            const filled = index < rating;
            return `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="${filled ? '#fbbf24' : 'none'}" stroke="${filled ? '#fbbf24' : '#d1d5db'}" stroke-width="2">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                </svg>
            `;
        }).join('');
    }

    handleFeedbackClick() {
        if (this.review) {
            this.showReview = true;
            this.element.innerHTML = this.getWidgetHTML();
            
            // Re-attach event listeners
            this.element.querySelector('.close-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.hide();
            });
        }
        this.onFeedbackClick();
    }
}

class FriendsVouchedWidget {
    constructor(options = {}) {
        this.friends = options.friends || [];
        this.productName = options.productName || 'this product';
        this.position = options.position || 'top-20 left-6';
        this.onClose = options.onClose || (() => {});
        this.onClick = options.onClick || (() => {});
        
        this.element = null;
        this.isVisible = false;
        this.isExpanded = false;
    }

    show() {
        if (this.isVisible) return;
        
        this.element = this.createElement();
        document.body.appendChild(this.element);
        this.isVisible = true;
        
        setTimeout(() => {
            this.element.classList.add('animate-slide-in');
        }, 10);
    }

    hide() {
        if (!this.isVisible || !this.element) return;
        
        this.element.style.transform = 'translateX(-100%)';
        this.element.style.opacity = '0';
        
        setTimeout(() => {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
            this.element = null;
            this.isVisible = false;
            this.isExpanded = false;
        }, 300);
        
        this.onClose();
    }

    createElement() {
        const widget = document.createElement('div');
        widget.className = `widget-container ${this.position}`;
        
        widget.innerHTML = this.getWidgetHTML();
        
        // Event listeners
        widget.querySelector('.close-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.hide();
        });
        
        if (!this.isExpanded) {
            widget.addEventListener('click', () => {
                this.handleClick();
            });
        }
        
        return widget;
    }

    getWidgetHTML() {
        const displayedFriends = this.friends.slice(0, 3);
        const remainingCount = Math.max(0, this.friends.length - 3);

        if (!this.isExpanded) {
            return `
                <div class="relative bg-white rounded-xl shadow-lg border border-gray-200 w-80 transform transition-all duration-300 ease-out cursor-pointer hover:scale-105 hover:shadow-xl">
                    <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 close-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    
                    <div class="p-4 pr-8">
                        <div class="flex items-center space-x-3">
                            <div class="flex items-center -space-x-2">
                                ${displayedFriends.map((friend, index) => `
                                    <div class="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden" style="z-index: ${displayedFriends.length - index}">
                                        ${friend.avatar ? 
                                            `<img src="${friend.avatar}" alt="${friend.name}" class="w-full h-full object-cover">` :
                                            `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">${friend.initials}</div>`
                                        }
                                    </div>
                                `).join('')}
                                
                                ${remainingCount > 0 ? `
                                    <div class="relative w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
                                        +${remainingCount}
                                    </div>
                                ` : ''}
                            </div>
                            
                            <div class="flex-1 min-w-0">
                                ${this.friends.length > 0 ? `
                                    <p class="text-sm text-gray-800 leading-relaxed">
                                        Your <span class="font-semibold text-teal-600">${this.friends.length} friends</span>
                                        <span class="text-gray-700"> have vouched for ${this.productName}</span>
                                    </p>
                                ` : `
                                    <p class="text-sm text-gray-800 leading-relaxed">
                                        <span class="font-semibold text-teal-600">No friends found</span>
                                        <span class="text-gray-700"> for ${this.productName}</span>
                                    </p>
                                `}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="relative bg-white rounded-xl shadow-lg border border-gray-200 w-96 transform transition-all duration-300 ease-out animate-fade-in">
                    <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 close-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    
                    <div class="p-6 pr-8">
                        <div class="flex items-center space-x-3 mb-6">
                            <div class="flex items-center -space-x-2">
                                ${displayedFriends.slice(0, 2).map((friend, index) => `
                                    <div class="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden" style="z-index: ${2 - index}">
                                        ${friend.avatar ? 
                                            `<img src="${friend.avatar}" alt="${friend.name}" class="w-full h-full object-cover">` :
                                            `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">${friend.initials}</div>`
                                        }
                                    </div>
                                `).join('')}
                                
                                ${remainingCount > 0 ? `
                                    <div class="relative w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
                                        +${remainingCount}
                                    </div>
                                ` : ''}
                            </div>
                        </div>

                        ${this.friends.length > 0 ? `
                            <div>
                                <h3 class="text-lg font-semibold text-gray-800 mb-1">
                                    Check which of <span class="text-teal-600">your Friends</span> vouched for this product...
                                </h3>
                            </div>
                        ` : `
                            <div class="border-2 border-dashed border-teal-200 rounded-lg p-6 bg-teal-50">
                                <div class="flex items-center space-x-3 mb-4">
                                    <div class="flex items-center -space-x-2">
                                        <div class="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                                            <div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                                                +2
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <h3 class="text-lg font-semibold text-gray-800 mb-2">
                                    No Friends Found! <span class="text-teal-600">Be the First to explore without any risk</span>
                                </h3>
                            </div>
                        `}
                    </div>
                </div>
            `;
        }
    }

    handleClick() {
        this.isExpanded = true;
        this.element.innerHTML = this.getWidgetHTML();
        
        // Re-attach event listeners
        this.element.querySelector('.close-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.hide();
        });
        
        this.onClick();
    }
}

class DiscountModal {
    constructor(options = {}) {
        this.title = options.title || "🎉 Get 20% Off When You Spot a Friend!";
        this.description = options.description || "See which of your friends have already shopped at Sleepy Owl and unlock your exclusive 20% discount.";
        this.discount = options.discount || "20%";
        this.companyName = options.companyName || "Sleepy Owl";
        this.friends = options.friends || [];
        this.onClose = options.onClose || (() => {});
        this.onCheckNow = options.onCheckNow || (() => {});
        this.onGetCoupon = options.onGetCoupon || (() => {});
        
        this.element = null;
        this.isVisible = false;
        this.showFriends = false;
    }

    show(showFriends = false) {
        if (this.isVisible) return;
        
        this.showFriends = showFriends;
        this.element = this.createElement();
        document.body.appendChild(this.element);
        this.isVisible = true;
    }

    hide() {
        if (!this.isVisible || !this.element) return;
        
        this.element.style.opacity = '0';
        
        setTimeout(() => {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
            this.element = null;
            this.isVisible = false;
            this.showFriends = false;
        }, 300);
        
        this.onClose();
    }

    createElement() {
        const modal = document.createElement('div');
        modal.className = 'modal-backdrop';
        modal.style.transition = 'opacity 0.3s ease-out';
        
        modal.innerHTML = `
            <div class="modal-content bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ease-out" style="background-image: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%);">
                <button class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors duration-200 close-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                
                <div class="p-8 pt-12">
                    <div class="text-center mb-6">
                        <div class="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2">
                                <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon>
                            </svg>
                        </div>
                        
                        <h2 class="text-xl font-bold text-gray-800 mb-3">${this.title}</h2>
                        <p class="text-sm text-gray-600 leading-relaxed">${this.description}</p>
                    </div>

                    ${this.showFriends && this.friends.length > 0 ? this.renderFriendsList() : ''}
                    
                    ${this.showFriends && this.friends.length > 0 ? `
                        <div class="mt-6 text-center">
                            <p class="text-lg font-semibold text-gray-800">
                                Found <span class="text-orange-600">${this.friends.length}</span> of your friends have bought from ${this.companyName}!
                            </p>
                        </div>
                    ` : ''}

                    <div class="mt-8">
                        ${this.showFriends && this.friends.length > 0 ? `
                            <button class="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 get-coupon-btn">
                                Get coupon now
                            </button>
                        ` : `
                            <button class="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 check-now-btn">
                                Check now
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;
        
        // Event listeners
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hide();
            }
        });
        
        modal.querySelector('.close-btn').addEventListener('click', () => {
            this.hide();
        });
        
        const checkNowBtn = modal.querySelector('.check-now-btn');
        if (checkNowBtn) {
            checkNowBtn.addEventListener('click', () => {
                this.showFriends = true;
                this.element.innerHTML = this.createElement().innerHTML;
                this.attachEventListeners();
                this.onCheckNow();
            });
        }
        
        const getCouponBtn = modal.querySelector('.get-coupon-btn');
        if (getCouponBtn) {
            getCouponBtn.addEventListener('click', () => {
                this.showCouponSuccess();
                this.onGetCoupon();
            });
        }
        
        return modal;
    }

    attachEventListeners() {
        this.element.addEventListener('click', (e) => {
            if (e.target === this.element) {
                this.hide();
            }
        });
        
        this.element.querySelector('.close-btn').addEventListener('click', () => {
            this.hide();
        });
        
        const getCouponBtn = this.element.querySelector('.get-coupon-btn');
        if (getCouponBtn) {
            getCouponBtn.addEventListener('click', () => {
                this.showCouponSuccess();
                this.onGetCoupon();
            });
        }
    }

    renderFriendsList() {
        return `
            <div class="mt-6 space-y-3">
                <div class="grid grid-cols-3 gap-3">
                    ${this.friends.slice(0, 9).map(friend => `
                        <div class="flex items-center space-x-2 text-sm">
                            <div class="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                                ${friend.avatar ? 
                                    `<img src="${friend.avatar}" alt="${friend.name}" class="w-full h-full object-cover">` :
                                    `<div class="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">${friend.initials}</div>`
                                }
                            </div>
                            <span class="text-gray-700 truncate">${friend.name}</span>
                        </div>
                    `).join('')}
                </div>
                
                ${this.friends.length > 9 ? `
                    <p class="text-sm text-gray-500 text-center">
                        +${this.friends.length - 9} more friends
                    </p>
                ` : ''}
            </div>
        `;
    }

    showCouponSuccess() {
        const successModal = new CouponSuccessModal({
            discount: this.discount,
            onClose: () => {
                this.hide();
            }
        });
        successModal.show();
    }
}

class CouponSuccessModal {
    constructor(options = {}) {
        this.discount = options.discount || "20%";
        this.customerName = options.customerName || "favourite customer";
        this.onClose = options.onClose || (() => {});
        
        this.element = null;
        this.isVisible = false;
    }

    show() {
        if (this.isVisible) return;
        
        this.element = this.createElement();
        document.body.appendChild(this.element);
        this.isVisible = true;
    }

    hide() {
        if (!this.isVisible || !this.element) return;
        
        this.element.style.opacity = '0';
        
        setTimeout(() => {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
            this.element = null;
            this.isVisible = false;
        }, 300);
        
        this.onClose();
    }

    createElement() {
        const modal = document.createElement('div');
        modal.className = 'modal-backdrop';
        modal.style.transition = 'opacity 0.3s ease-out';
        
        modal.innerHTML = `
            <div class="modal-content bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ease-out" style="background-image: linear-gradient(135deg, #fef3c7 0%, #fbbf24 50%, #f59e0b 100%);">
                <button class="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition-colors duration-200 close-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                
                <div class="p-8 pt-12 text-center">
                    <div class="relative inline-flex items-center justify-center mb-6">
                        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2">
                                <polyline points="20,6 9,17 4,12"></polyline>
                            </svg>
                        </div>
                        <svg class="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                    </div>

                    <div class="mb-8">
                        <h2 class="text-2xl font-bold text-gray-800 mb-3">Wohooo! 🎉</h2>
                        
                        <div class="space-y-2">
                            <p class="text-lg font-semibold text-gray-800">
                                <span class="text-orange-600 text-xl">${this.discount} off</span> for our ${this.customerName}
                            </p>
                            <p class="text-base text-gray-700">across everything on the store!</p>
                        </div>
                    </div>

                    <div class="bg-white bg-opacity-80 rounded-lg p-4 mb-6">
                        <p class="text-sm text-gray-600 mb-2">Your discount code:</p>
                        <div class="bg-gray-100 rounded-lg px-4 py-2 font-mono text-lg font-bold text-gray-800 border-2 border-dashed border-gray-300">
                            FRIEND${this.discount.replace('%', '')}
                        </div>
                        <p class="text-xs text-gray-500 mt-2">Code automatically applied at checkout</p>
                    </div>

                    <button class="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 close-btn-main">
                        Start Shopping
                    </button>

                    <p class="text-xs text-gray-600 mt-4 opacity-75">
                        Valid for 24 hours • Cannot be combined with other offers
                    </p>
                </div>
            </div>
        `;
        
        // Event listeners
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hide();
            }
        });
        
        modal.querySelector('.close-btn').addEventListener('click', () => {
            this.hide();
        });
        
        modal.querySelector('.close-btn-main').addEventListener('click', () => {
            this.hide();
        });
        
        return modal;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SocialProofWidget,
        PurchaseNotificationWidget,
        FriendsVouchedWidget,
        DiscountModal,
        CouponSuccessModal
    };
}