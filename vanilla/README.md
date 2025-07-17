# Social Proof Widgets - Vanilla JavaScript

Production-ready social proof notification widgets built with pure JavaScript and Tailwind CSS.

## Features

- **No Framework Dependencies**: Pure JavaScript ES6+
- **Lightweight**: Minimal footprint with maximum impact
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: CSS transitions and keyframe animations
- **Customizable**: Easy to modify colors, text, and behavior
- **Production Ready**: Clean, maintainable code

## Quick Start

1. Include Tailwind CSS in your HTML:
```html
<script src="https://cdn.tailwindcss.com"></script>
```

2. Include the widget JavaScript file:
```html
<script src="social-proof-widgets.js"></script>
```

3. Initialize and show a widget:
```javascript
const socialProof = new SocialProofWidget({
    users: [
        {
            id: '1',
            name: 'John Doe',
            avatar: 'https://example.com/avatar.jpg',
            initials: 'JD'
        }
    ],
    productName: 'Your Product',
    onClose: () => console.log('Widget closed'),
    onClick: () => console.log('Widget clicked')
});

socialProof.show();
```

## Available Widgets

### 1. SocialProofWidget
Shows users who vouched for your product with stacked avatars.

```javascript
const widget = new SocialProofWidget({
    users: [...],              // Array of user objects
    additionalCount: 5,        // Additional count to show
    productName: 'Product',    // Product name
    position: 'bottom-6 left-6', // CSS positioning classes
    onClose: () => {},         // Close callback
    onClick: () => {}          // Click callback
});
```

### 2. PurchaseNotificationWidget
Purchase notification that expands to show customer reviews.

```javascript
const widget = new PurchaseNotificationWidget({
    customer: {...},           // Customer object
    productName: 'Product',    // Product name
    productImage: 'url',       // Product image URL
    companyName: 'Company',    // Company name
    review: {...},             // Review object with rating and text
    position: 'bottom-6 right-6',
    onClose: () => {},
    onFeedbackClick: () => {}
});
```

### 3. FriendsVouchedWidget
Shows friends who vouched, expands to show friend details.

```javascript
const widget = new FriendsVouchedWidget({
    friends: [...],            // Array of friend objects
    productName: 'Product',    // Product name
    position: 'top-20 left-6',
    onClose: () => {},
    onClick: () => {}
});
```

### 4. DiscountModal
Full-screen modal with friend discovery and discount offers.

```javascript
const modal = new DiscountModal({
    title: 'Get 20% Off!',     // Modal title
    description: '...',        // Modal description
    discount: '20%',           // Discount percentage
    companyName: 'Company',    // Company name
    friends: [...],            // Array of friends
    onClose: () => {},
    onCheckNow: () => {},
    onGetCoupon: () => {}
});

modal.show(); // or modal.show(true) to show friends immediately
```

### 5. CouponSuccessModal
Success modal for coupon redemption.

```javascript
const modal = new CouponSuccessModal({
    discount: '20%',           // Discount percentage
    customerName: 'customer',  // Customer name
    onClose: () => {}
});
```

## Data Structures

### User Object
```javascript
{
    id: 'unique-id',
    name: 'User Name',
    avatar: 'https://example.com/avatar.jpg', // Optional
    initials: 'UN' // Used when no avatar
}
```

### Review Object
```javascript
{
    rating: 5,        // 1-5 stars
    text: 'Review text...'
}
```

## Styling

The widgets use Tailwind CSS classes for styling. You can customize the appearance by:

1. **Modifying CSS classes** in the widget source code
2. **Adding custom CSS** to override default styles
3. **Using Tailwind configuration** to change colors and spacing

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## File Structure

```
vanilla/
├── index.html                 # Demo page
├── social-proof-widgets.js    # Main widget library
├── demo.js                    # Demo implementation
└── README.md                  # This file
```

## Integration Examples

### Basic Integration
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <script src="social-proof-widgets.js"></script>
    <script>
        const widget = new SocialProofWidget({
            users: [/* your users */],
            productName: 'Your Product'
        });
        widget.show();
    </script>
</body>
</html>
```

### With Custom Positioning
```javascript
// Bottom left
new SocialProofWidget({ position: 'bottom-6 left-6' });

// Top right
new SocialProofWidget({ position: 'top-20 right-6' });

// Custom positioning
new SocialProofWidget({ position: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' });
```

### Event Handling
```javascript
const widget = new SocialProofWidget({
    users: users,
    onClose: () => {
        console.log('Widget was closed');
        // Track analytics, save state, etc.
    },
    onClick: () => {
        console.log('Widget was clicked');
        // Redirect to product page, show more info, etc.
        window.location.href = '/product';
    }
});
```

## Performance Tips

1. **Lazy Loading**: Only initialize widgets when needed
2. **Image Optimization**: Use optimized avatar images
3. **Debouncing**: Debounce rapid show/hide calls
4. **Memory Management**: Always call `hide()` to clean up

## License

MIT License - feel free to use in commercial projects.

## Support

For issues and questions, please check the demo implementation in `demo.js` for usage examples.