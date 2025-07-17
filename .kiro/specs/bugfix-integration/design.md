# Design Document

## Overview

This design document outlines the systematic approach to identify and fix integration issues between the Strapi backend and Next.js frontend of the Viktoria Wertheim website. The focus is on ensuring reliable data flow, proper error handling, and consistent content display across all sections of the website.

## Architecture

### Current System Architecture
- **Frontend**: Next.js 15+ with App Router, TypeScript, Tailwind CSS
- **Backend**: Strapi 5+ CMS with SQLite (dev) / PostgreSQL (prod)
- **Communication**: REST API calls from frontend to backend
- **Image Handling**: Strapi Media Library with Next.js Image optimization

### Problem Areas Identified
1. **API Integration Layer**: Inconsistent data fetching and error handling
2. **Content Display Logic**: Missing or incorrect rendering of CMS content
3. **Image Loading**: Problems with Strapi media URLs and Next.js optimization
4. **CORS Configuration**: Potential cross-origin request issues

## Components and Interfaces

### 1. API Service Layer
**Purpose**: Centralized API communication with proper error handling

**Key Components**:
- `StrapiService`: Main service class for all Strapi API calls
- `ApiClient`: Axios-based HTTP client with interceptors
- `ErrorHandler`: Centralized error handling and logging
- `TypeDefinitions`: TypeScript interfaces for all API responses

**Interface Design**:
```typescript
interface StrapiService {
  getNews(): Promise<NewsArticle[]>
  getTeams(): Promise<Team[]>
  getPlayers(teamId: string): Promise<Player[]>
  getMatches(): Promise<Match[]>
  getStandings(): Promise<Standing[]>
}

interface ApiResponse<T> {
  data: T
  meta?: {
    pagination?: PaginationInfo
  }
  error?: ApiError
}
```

### 2. Content Display Components
**Purpose**: Reliable rendering of CMS content with fallbacks

**Key Components**:
- `NewsSection`: Display news articles with proper error states
- `TeamOverview`: Show teams with fallback for missing data
- `MatchSchedule`: Display matches with loading and error states
- `StandingsTable`: Show league table with proper formatting

**Error State Handling**:
- Loading skeletons for better UX
- Fallback content when data is unavailable
- Retry mechanisms for failed requests

### 3. Image Optimization System
**Purpose**: Reliable image loading from Strapi Media Library

**Components**:
- `StrapiImage`: Custom component wrapping Next.js Image
- `ImageFallback`: Placeholder system for failed image loads
- `MediaUrlResolver`: Handles Strapi media URL construction

## Data Models

### Strapi Content Types Validation
Ensure all required content types exist and have proper fields:

```typescript
interface NewsArticle {
  id: number
  title: string
  content: string
  publishedAt: string
  featuredImage?: StrapiMedia
  category?: string
}

interface Team {
  id: number
  name: string
  league: string
  teamPhoto?: StrapiMedia
  coach?: string
  players?: Player[]
}

interface Player {
  id: number
  firstName: string
  lastName: string
  position: string
  photo?: StrapiMedia
  team: Team
}

interface Match {
  id: number
  date: string
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  team: Team
}
```

## Error Handling

### 1. API Error Handling Strategy
- **Network Errors**: Retry logic with exponential backoff
- **404 Errors**: Graceful fallback to empty state
- **500 Errors**: User-friendly error messages with retry option
- **CORS Errors**: Clear indication of configuration issues

### 2. Frontend Error Boundaries
- React Error Boundaries for component-level error catching
- Global error handler for unhandled promise rejections
- Logging system for debugging in development

### 3. User Experience During Errors
- Loading states with skeleton components
- Meaningful error messages in German
- Retry buttons where appropriate
- Fallback content when possible

## Testing Strategy

### 1. Integration Testing
- **API Endpoint Testing**: Verify all Strapi endpoints return expected data
- **Data Flow Testing**: Ensure data flows correctly from backend to frontend
- **Error Scenario Testing**: Test various failure modes and recovery

### 2. Component Testing
- **Content Display Testing**: Verify components render with real API data
- **Error State Testing**: Test all error states and fallbacks
- **Loading State Testing**: Verify loading indicators work correctly

### 3. End-to-End Testing
- **User Journey Testing**: Test complete user flows (e.g., reading news)
- **Mobile Testing**: Verify functionality on mobile devices
- **Performance Testing**: Ensure acceptable load times

## Implementation Approach

### Phase 1: Diagnostic and Analysis
1. **API Endpoint Audit**: Test all Strapi endpoints manually
2. **Frontend Data Flow Analysis**: Trace data from API to display
3. **Error Log Analysis**: Review browser console and network errors
4. **CORS Configuration Check**: Verify backend allows frontend requests

### Phase 2: Core Fixes
1. **API Service Implementation**: Create robust API service layer
2. **Error Handling Implementation**: Add comprehensive error handling
3. **Content Display Fixes**: Fix rendering issues in components
4. **Image Loading Fixes**: Resolve Strapi media integration

### Phase 3: Testing and Validation
1. **Integration Testing**: Verify all fixes work together
2. **User Acceptance Testing**: Test from user perspective
3. **Performance Validation**: Ensure fixes don't impact performance
4. **Mobile Testing**: Verify mobile functionality

## Configuration Requirements

### Strapi Backend Configuration
- **CORS Settings**: Ensure frontend domain is allowed
- **Media Settings**: Verify media library configuration
- **API Permissions**: Check public access to required content types
- **Database Connection**: Verify database connectivity

### Next.js Frontend Configuration
- **API Base URL**: Correct Strapi backend URL
- **Image Domains**: Add Strapi domain to Next.js image config
- **Environment Variables**: Proper configuration for different environments
- **Error Reporting**: Setup for debugging and monitoring