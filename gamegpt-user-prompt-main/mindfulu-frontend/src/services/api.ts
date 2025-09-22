/**
 * Centralized API Service for GameGPT Frontend
 * Handles all backend communication
 */

import { GameSchema } from '@/types/game-schema';

export interface GameRequest {
  description?: string;
  gameType?: GameSchema['type'];
  difficulty?: 'easy' | 'medium' | 'hard';
  targetAge?: string;
  estimatedTime?: number;
  learningObjectives?: string;
  theme?: string;
  customRequirements?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:8000'; 
  }

  /**
   * Generate a therapeutic game from user request
   */
  async generateGame(request?: GameRequest): Promise<GameSchema> {
    try {
      console.log('🌐 Making POST request to /generate');
      
      // Convert GameRequest to the format expected by the backend
      const backendRequest = {
        prompt: request?.description || 'Generate a therapeutic game'
      };
      
      const response = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendRequest)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const gameSchema: GameSchema = await response.json();
      return gameSchema;
    } catch (error) {
      console.error('API call failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to generate game: ${errorMessage}`);
    }
  }

  /**
   * Get API health status
   */
  async getHealthStatus(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw new Error('Failed to check API health');
    }
  }

  /**
   * Get API statistics
   */
  async getStats(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/stats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Stats fetch failed:', error);
      throw new Error('Failed to fetch API stats');
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();
