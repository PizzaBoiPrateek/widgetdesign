// Demo implementation
document.addEventListener('DOMContentLoaded', function() {
    // Sample data
    const sampleUsers = [
        {
            id: '1',
            name: 'Anay',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
            initials: 'AN'
        },
        {
            id: '2',
            name: 'Nishant',
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
            initials: 'NS'
        },
        {
            id: '3',
            name: 'Priya',
            avatar: '',
            initials: 'PR'
        },
        {
            id: '4',
            name: 'Rahul',
            avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
            initials: 'RH'
        }
    ];

    const sampleFriends = [
        {
            id: '1',
            name: 'Sarah',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
            initials: 'SR'
        },
        {
            id: '2',
            name: 'Mike',
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
            initials: 'MK'
        },
        {
            id: '3',
            name: 'Emma',
            avatar: '',
            initials: 'EM'
        }
    ];

    const sampleModalFriends = [
        { id: '1', name: 'Agarwal', avatar: '', initials: 'AG' },
        { id: '2', name: 'Prateek', avatar: '', initials: 'PR' },
        { id: '3', name: 'Harshvardhan Agarwal', avatar: '', initials: 'HA' },
        { id: '4', name: 'Prateek', avatar: '', initials: 'PR' },
        { id: '5', name: 'Harshvardhan Agarwal', avatar: '', initials: 'HA' },
        { id: '6', name: 'Agarwal', avatar: '', initials: 'AG' },
        { id: '7', name: 'Prateek', avatar: '', initials: 'PR' },
        { id: '8', name: 'Harshvardhan Agarwal', avatar: '', initials: 'HA' },
        { id: '9', name: 'Prateek', avatar: '', initials: 'PR' },
        { id: '10', name: 'Harshvardhan Agarwal', avatar: '', initials: 'HA' }
    ];

    const sampleCustomer = {
        id: '1',
        name: 'Katherine Moss',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
        initials: 'KM'
    };

    const sampleReview = {
        rating: 5,
        text: "Love the simplicity of the service and the prompt customer support. We can't imagine working without it."
    };

    const sampleProductImage = "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1";

    // Widget instances
    let socialProofWidget = null;
    let purchaseNotificationWidget = null;
    let friendsVouchedWidget = null;
    let discountModal = null;

    // Button handlers
    document.getElementById('toggleSocialProof').addEventListener('click', function() {
        const button = this;
        
        if (socialProofWidget && socialProofWidget.isVisible) {
            socialProofWidget.hide();
            button.textContent = 'Show Widget';
            button.className = 'w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200';
        } else {
            socialProofWidget = new SocialProofWidget({
                users: sampleUsers,
                additionalCount: 2,
                productName: 'this amazing product',
                position: 'bottom-6 left-6',
                onClose: () => {
                    button.textContent = 'Show Widget';
                    button.className = 'w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200';
                },
                onClick: () => {
                    console.log('Social proof widget clicked!');
                }
            });
            socialProofWidget.show();
            button.textContent = 'Hide Widget';
            button.className = 'w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200';
        }
    });

    document.getElementById('togglePurchaseNotification').addEventListener('click', function() {
        const button = this;
        
        if (purchaseNotificationWidget && purchaseNotificationWidget.isVisible) {
            purchaseNotificationWidget.hide();
            button.textContent = 'Show Widget';
            button.className = 'w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200';
        } else {
            purchaseNotificationWidget = new PurchaseNotificationWidget({
                customer: sampleCustomer,
                productName: 'Premium Plan',
                productImage: sampleProductImage,
                companyName: 'Good4Me',
                review: sampleReview,
                position: 'bottom-6 right-6',
                onClose: () => {
                    button.textContent = 'Show Widget';
                    button.className = 'w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200';
                },
                onFeedbackClick: () => {
                    console.log('Feedback clicked!');
                }
            });
            purchaseNotificationWidget.show();
            button.textContent = 'Hide Widget';
            button.className = 'w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200';
        }
    });

    document.getElementById('toggleFriendsVouched').addEventListener('click', function() {
        const button = this;
        
        if (friendsVouchedWidget && friendsVouchedWidget.isVisible) {
            friendsVouchedWidget.hide();
            button.textContent = 'Show Widget';
            button.className = 'w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200';
        } else {
            friendsVouchedWidget = new FriendsVouchedWidget({
                friends: sampleFriends,
                productName: 'this product',
                position: 'top-20 left-6',
                onClose: () => {
                    button.textContent = 'Show Widget';
                    button.className = 'w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200';
                },
                onClick: () => {
                    console.log('Friends vouched widget clicked!');
                }
            });
            friendsVouchedWidget.show();
            button.textContent = 'Hide Widget';
            button.className = 'w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200';
        }
    });

    document.getElementById('showDiscountModal').addEventListener('click', function() {
        discountModal = new DiscountModal({
            title: "🎉 Get 20% Off When You Spot a Friend!",
            description: "See which of your friends have already shopped at Sleepy Owl and unlock your exclusive 20% discount.",
            discount: "20%",
            companyName: "Sleepy Owl",
            friends: sampleModalFriends,
            onClose: () => {
                console.log('Discount modal closed');
            },
            onCheckNow: () => {
                console.log('Check now clicked');
            },
            onGetCoupon: () => {
                console.log('Get coupon clicked');
            }
        });
        discountModal.show();
    });

    document.getElementById('showCashbackModal').addEventListener('click', function() {
        // For demo purposes, we'll create a simple cashback modal
        const modal = document.createElement('div');
        modal.className = 'modal-backdrop';
        modal.innerHTML = `
            <div class="modal-content bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
                <div class="p-8 text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4">Cashback Modal</h2>
                    <p class="text-gray-600 mb-6">This would be the cashback modal with rating and contact selection features.</p>
                    <button class="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 close-cashback">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('close-cashback')) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
    });

    // Auto-demo functionality
    let autoDemo = false;
    
    function startAutoDemo() {
        if (autoDemo) return;
        autoDemo = true;
        
        // Show social proof widget after 2 seconds
        setTimeout(() => {
            if (!socialProofWidget || !socialProofWidget.isVisible) {
                document.getElementById('toggleSocialProof').click();
            }
        }, 2000);
        
        // Show purchase notification after 5 seconds
        setTimeout(() => {
            if (!purchaseNotificationWidget || !purchaseNotificationWidget.isVisible) {
                document.getElementById('togglePurchaseNotification').click();
            }
        }, 5000);
        
        // Show friends vouched after 8 seconds
        setTimeout(() => {
            if (!friendsVouchedWidget || !friendsVouchedWidget.isVisible) {
                document.getElementById('toggleFriendsVouched').click();
            }
        }, 8000);
    }
    
    // Start auto demo after page load
    setTimeout(startAutoDemo, 1000);
});