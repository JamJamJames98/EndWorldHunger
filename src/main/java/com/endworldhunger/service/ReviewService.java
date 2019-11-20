package com.endworldhunger.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.endworldhunger.dao.ReviewDao;
import com.endworldhunger.model.ProviderReview;
import com.endworldhunger.model.UserReview;

@Service("reviewService")
public class ReviewService {
	
	@Autowired
	ReviewDao reviewDao;
	
	@Transactional
	public List<ProviderReview> getAllReviewsForUser(int id) {
		return reviewDao.getAllReviewsForUser(id);
	}
	
	@Transactional
	public List<UserReview> getAllReviewsByUser(int id) {
		return reviewDao.getAllReviewsByUser(id);
	}
	
	
	@Transactional
	public List<UserReview> getAllReviewsForProvider(int id) {
		return reviewDao.getAllReviewsForProvider(id);
	}
	
	@Transactional
	public List<ProviderReview> getAllReviewsByProvider(int id) {
		return reviewDao.getAllReviewsByProvider(id);
	}
	
	@Transactional
	public ProviderReview addReviewForUser(ProviderReview providerReview) {
		return reviewDao.addReviewForUser(providerReview);
	}
	
	@Transactional
	public UserReview addReviewForProvider(UserReview userReview) {
		return reviewDao.addReviewForProvider(userReview);
	}
	
	@Transactional
	public double getAverageForUser(int id) {
		return reviewDao.getAverageForUser(id);
	}
	
	@Transactional
	public double getAverageForProvider(int id) {
		return reviewDao.getAverageForProvider(id);
	}
}
