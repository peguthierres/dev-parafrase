-- Setting up Row Level Security policies for all tables

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Authors policies (public read, authenticated users can create)
CREATE POLICY "Anyone can view authors" ON authors FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create authors" ON authors FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own author profile" ON authors FOR UPDATE USING (auth.uid() = user_id);

-- Quotes policies (public read, authenticated users can create)
CREATE POLICY "Anyone can view approved quotes" ON quotes FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can view their own quotes" ON quotes FOR SELECT USING (auth.uid() = submitted_by);
CREATE POLICY "Authenticated users can create quotes" ON quotes FOR INSERT WITH CHECK (auth.uid() = submitted_by);
CREATE POLICY "Users can update their own quotes" ON quotes FOR UPDATE USING (auth.uid() = submitted_by);

-- Comments policies
CREATE POLICY "Anyone can view comments" ON comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments" ON comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON comments FOR DELETE USING (auth.uid() = user_id);

-- Likes policies
CREATE POLICY "Anyone can view likes" ON likes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create likes" ON likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own likes" ON likes FOR DELETE USING (auth.uid() = user_id);

-- Follows policies
CREATE POLICY "Anyone can view follows" ON follows FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create follows" ON follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can delete their own follows" ON follows FOR DELETE USING (auth.uid() = follower_id);

-- Ads policies (admin only)
CREATE POLICY "Anyone can view active ads" ON ads FOR SELECT USING (is_active = true);
