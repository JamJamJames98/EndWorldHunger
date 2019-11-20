package com.endworldhunger.controller;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.endworldhunger.model.Provider;
import com.endworldhunger.model.ProviderReview;
import com.endworldhunger.model.User;
import com.endworldhunger.model.UserLogs;
import com.endworldhunger.model.UserReview;
import com.endworldhunger.service.ProviderService;
import com.endworldhunger.service.ReviewService;
import com.endworldhunger.service.UserLogsService;
import com.endworldhunger.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/review")
@SuppressWarnings({"unchecked", "rawtypes"})
public class ReviewController {
	
	@Autowired
	ReviewService reviewService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	ProviderService providerService;
	
	@Autowired
	UserLogsService logService;
	
	@GetMapping("/for/user/{id}")
	// Gets all reviews made FOR the user
	public ResponseEntity<?> getAllReviewsForUser(@PathVariable("id") int id) {
		List<ProviderReview> userReviews = reviewService.getAllReviewsForUser(id);
		return new ResponseEntity(userReviews, HttpStatus.OK);
	}
	
	@GetMapping("/by/user/{id}")
	// Gets all reviews made BY the user
	public ResponseEntity<?> getAllReviewsByUser(@PathVariable("id") int id) {
		List<UserReview> userReviews = reviewService.getAllReviewsByUser(id);
		return new ResponseEntity(userReviews, HttpStatus.OK);
	}
	
	@GetMapping("/for/provider/{id}")
	// Gets all reviews made for the provider
	public ResponseEntity<?> getAllReviewsForProvider(@PathVariable("id") int id) {
		List<UserReview> providerReviews = reviewService.getAllReviewsForProvider(id);
		return new ResponseEntity(providerReviews, HttpStatus.OK);
	}
	
	
	@GetMapping("/user/{id}/avg")
	public ResponseEntity<?> getAverageForUser(@PathVariable("id") int id) {
		double avg = reviewService.getAverageForUser(id);
		return new ResponseEntity(avg, HttpStatus.OK);
	}

	@GetMapping("/provider/{id}/avg")
	public ResponseEntity<?> getAverageForProvider(@PathVariable("id") int id) {
		double avg = reviewService.getAverageForProvider(id);
		return new ResponseEntity(avg, HttpStatus.OK);
	}
	
	
	@GetMapping("/by/provider/{id}")
	// Gets all reviews made BY the user
	public ResponseEntity<?> getAllReviewsByProvider(@PathVariable("id") int id) {
		List<ProviderReview> providerReviews = reviewService.getAllReviewsByProvider(id);
		return new ResponseEntity(providerReviews, HttpStatus.OK);
	}
	
	@PostMapping("/user/{id}")
	// Adds a review made for a user
	public ResponseEntity<?> addReviewForUser(@PathVariable("id") int id, @RequestBody ProviderReview providerReview) {
		User user = userService.getUser(id);
		providerReview.setOwner(user);
		
		int providerId = providerReview.getAuthor().getId();
		Provider provider = providerService.getProvider(providerId);
		
		if (user == null) {
			return new ResponseEntity("Unable to find the user with the given ID", HttpStatus.BAD_REQUEST);
		}
		
		if (provider == null) {
			return new ResponseEntity("Unable to find the provider with the given ID", HttpStatus.BAD_REQUEST);
		}
		
		ProviderReview result = reviewService.addReviewForUser(providerReview);
		
		// Log
		UserLogs userLog = new UserLogs();
		UserLogs userLog2 = new UserLogs();
		String activity = "You left a review for User " + user.getName() + " - " + providerReview.getId();
		String activity2 = "You rated User " + providerReview.getRating() + " stars"; 	
		Date date = new Date();

		userLog.setActivity(activity);
		userLog.setProvider(provider);
		userLog2.setActivity(activity2);
		userLog2.setProvider(provider);
		
		userLog.setLogTime(new Timestamp(date.getTime()));
		userLog2.setLogTime(new Timestamp(date.getTime()));
		logService.addUserLogs(userLog);
		logService.addUserLogs(userLog2);
		
		return new ResponseEntity(result, HttpStatus.OK);
	}
	
	@PostMapping("/provider/{id}")
	// Adds a review made for a provider
	public ResponseEntity<?> addReviewForProvider(@PathVariable("id") int id, @RequestBody UserReview userReview) {
		Provider provider = providerService.getProvider(id);
		userReview.setOwner(provider);
		
		int userId = userReview.getAuthor().getId();
		User user = userService.getUser(userId);
		
		if (provider == null) {
			return new ResponseEntity("Unable to find the provider with the given ID", HttpStatus.BAD_REQUEST);
		}
		
		if (user == null) {
			return new ResponseEntity("Unable to find the user with the given ID", HttpStatus.BAD_REQUEST);
		}
		
		UserReview result = reviewService.addReviewForProvider(userReview);
		
		// Log
		UserLogs userLog = new UserLogs();
		UserLogs userLog2 = new UserLogs();
		String activity = "You left a review for Provider " + provider.getProviderName() + " - " + userReview.getId();
		String activity2 = "You rated Provider " + userReview.getRating() + " stars"; 	
		Date date = new Date();

		userLog.setActivity(activity);
		userLog.setUser(user);
		userLog2.setActivity(activity2);
		userLog2.setUser(user);
		
		userLog.setLogTime(new Timestamp(date.getTime()));
		userLog2.setLogTime(new Timestamp(date.getTime()));
		logService.addUserLogs(userLog);
		logService.addUserLogs(userLog2);
		
		return new ResponseEntity(result, HttpStatus.OK);
	}
}
