/**
 * Workspace Flow — Workspace Model
 * @author Abdelfatah
 * Represents a workspace item (note). Collection: 'notes' (compatible with original DB).
 */

const mongoose = require('mongoose');

const workspaceItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      minlength: 1,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['private', 'public'],
      default: 'private',
    },
    is_pinned: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Identity',
      required: [true, 'User reference is required'],
    },
  },
  {
    timestamps: true,
    // Keep original collection name for DB compatibility
    collection: 'notes',
  }
);

// Index for faster user-based queries
workspaceItemSchema.index({ user_id: 1, createdAt: -1 });
workspaceItemSchema.index({ user_id: 1, is_pinned: -1 });

const WorkspaceItem = mongoose.model('WorkspaceItem', workspaceItemSchema);

module.exports = WorkspaceItem;
