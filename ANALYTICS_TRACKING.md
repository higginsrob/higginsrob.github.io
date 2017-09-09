# Google Analytics Event Tracking Implementation

## Overview
Google Analytics (GA4) event tracking has been implemented across the entire portfolio website. All user interactions with buttons and links are now tracked for analytics and insights.

## Tracking Categories

### 1. Navigation Events (`navigation` category)
**Tracked in:** Header component

**Desktop Navigation:**
- Home link click
- About link click  
- Experience link click
- Projects link click
- Skills link click

**Mobile Navigation:**
- Same links tracked with "(Mobile)" suffix

### 2. Social Media Events (`social` category)
**Tracked in:** Header component (both desktop and mobile)

- GitHub link click
- LinkedIn link click
- Mobile versions tracked separately

### 3. Project Interactions (`project` category)
**Tracked in:** PersonalProjects component

**Actions tracked per project:**
- `view_code` - GitHub repository button click
- `view_npm` - NPM package button click
- `view_demo_image` - Project image click (for live demos)
- `view_video_image` - Project image click (for video projects)

**Projects with tracking:**
- Boss RC-10r Midi Remote
- JDOM.js
- Audio Separator + Stem Player

### 4. Video Events (`video` category)
**Tracked in:** About component

**Videos tracked:**
- OneWheel Hockey
- Streaker Commercial
- NYC Marathon 2024
- Breckenridge Live Music

### 5. Image/Lightbox Events (`image` category)
**Tracked in:** 
- PersonalProjects component (screenshot thumbnails)
- Experience component (company logos/images)

**Tracked interactions:**
- Project screenshot clicks
- Company logo clicks (Panorama AI, Vertebrae, etc.)

### 6. AI Chat Events (`ai_chat` category)
**Tracked in:** AIChat component

**Actions tracked:**
- `open` - Chat window opened
- `close` - Chat window closed
- `user_message` - User sent a message (includes full message text and length)

## Event Structure

Each tracked event follows this structure:

```javascript
// Standard click events
{
  event: 'click',
  event_category: 'category_name',  // navigation, project, social, etc.
  event_label: 'specific_action',   // e.g., "JDOM.js - view_code"
  value: optional_numeric_value
}

// AI Chat message events (special)
{
  event: 'chat_message',
  event_category: 'ai_chat',
  event_label: 'user_message',
  message_content: 'actual user message text',
  message_length: 42  // character count
}
```

## Utility Functions

All tracking functions are available in `/src/utils/analytics.ts`:

- `trackClick(category, label, value)` - Generic click tracking
- `trackNavigation(destination)` - Navigation link clicks
- `trackProjectClick(projectName, action)` - Project interactions
- `trackSocialClick(platform)` - Social media links
- `trackVideoClick(videoTitle)` - Video plays
- `trackImageClick(imageTitle)` - Image/lightbox opens
- `trackChatAction(action, message?)` - AI chat interactions (open/close)
- `trackChatMessage(messageText)` - AI chat messages with full text

## Production vs Development

Google Analytics only loads in production:
- **Development (localhost)**: GA disabled, console shows "Google Analytics disabled in development"
- **Production (higginsrob.github.io)**: GA active, console shows "Google Analytics loaded"

This prevents development activity from polluting analytics data.

## Viewing Analytics Data

In your Google Analytics dashboard, you can view:

1. **Events Overview**: GA4 > Reports > Events
2. **Event Details**: Click on individual events to see:
   - Event count
   - Event category breakdown
   - Event label details (specific actions)
3. **Real-time**: See live user interactions as they happen
4. **Custom Reports**: Create reports filtering by event_category or event_label

## Common Queries

### Most popular projects
Filter by `event_category = 'project'` and group by `event_label`

### Navigation patterns  
Filter by `event_category = 'navigation'` to see user flow

### AI Chat engagement
Filter by `event_category = 'ai_chat'` to track chat usage

### User questions and interests
Look at `message_content` field in chat_message events to see what users are asking about Rob

### Social media clicks
Filter by `event_category = 'social'` to see which platforms drive traffic

## Console Logging

All tracking events are logged to console in development for debugging:
```
GA Event: { category: 'project', label: 'JDOM.js - view_code', value: undefined }
GA Chat Message: { message: 'What projects has Rob worked on?...', length: 35 }
```

Chat messages longer than 100 characters are truncated in console logs but sent in full to Google Analytics.

This makes it easy to verify tracking is working correctly during development.

## Privacy Considerations

**Note:** The AI chat tracking includes the full user message text. This allows you to:
- Understand what visitors want to know about Rob
- Identify common questions to improve content
- See engagement patterns with the AI assistant

The message content is sent to Google Analytics and subject to their data retention policies. User messages are not personally identifiable unless the user includes such information in their questions.
