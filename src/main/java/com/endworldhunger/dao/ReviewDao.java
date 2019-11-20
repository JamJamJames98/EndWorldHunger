package com.endworldhunger.dao;

import java.util.List;

import com.endworldhunger.model.ProviderReview;
import com.endworldhunger.model.UserReview;

public interface ReviewDao {
	public List<ProviderReview> getAllReviewsForUser(int id);
	
	public List<UserReview> getAllReviewsByUser(int id);
	
	public ProviderReview addReviewForUser(ProviderReview providerReview);
	
	public List<UserReview> getAllReviewsForProvider(int id);
	
	public List<ProviderReview> getAllReviewsByProvider(int id);
	
	public UserReview addReviewForProvider(UserReview userReview);
	
	public double getAverageForUser(int id);
	
	public double getAverageForProvider(int id);
}
