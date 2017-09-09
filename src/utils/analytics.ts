// Google Analytics event tracking utilities

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Track a click event in Google Analytics
 * @param category - Event category (e.g., 'navigation', 'project', 'social')
 * @param label - Event label (e.g., button text, link destination)
 * @param value - Optional numeric value
 */
export const trackClick = (
  category: string,
  label: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Track a navigation click event
 * @param destination - Where the navigation leads to
 */
export const trackNavigation = (destination: string) => {
  trackClick('navigation', destination);
};

/**
 * Track a project interaction
 * @param projectName - Name of the project
 * @param action - Type of action (view_demo, view_code, view_npm, etc.)
 */
export const trackProjectClick = (projectName: string, action: string) => {
  trackClick('project', `${projectName} - ${action}`);
};

/**
 * Track a social media link click
 * @param platform - Social media platform name
 */
export const trackSocialClick = (platform: string) => {
  trackClick('social', platform);
};

/**
 * Track a video click
 * @param videoTitle - Title of the video
 */
export const trackVideoClick = (videoTitle: string) => {
  trackClick('video', videoTitle);
};

/**
 * Track an image/lightbox click
 * @param imageTitle - Title/description of the image
 */
export const trackImageClick = (imageTitle: string) => {
  trackClick('image', imageTitle);
};

/**
 * Track AI Chat interactions
 * @param action - Type of chat action (open, close, message)
 * @param message - Optional message content for message events
 */
export const trackChatAction = (action: string, message?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'ai_chat',
      event_label: action,
      message_content: message,
    });
  }
};

/**
 * Track AI Chat message submission
 * @param messageText - The actual message text sent by the user
 */
export const trackChatMessage = (messageText: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'chat_message', {
      event_category: 'ai_chat',
      event_label: 'user_message',
      message_content: messageText,
      message_length: messageText.length,
    });
  }
};
