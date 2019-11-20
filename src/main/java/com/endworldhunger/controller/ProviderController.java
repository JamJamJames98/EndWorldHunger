package com.endworldhunger.controller;

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

import com.endworldhunger.model.FoodItem;
import com.endworldhunger.model.Provider;
import com.endworldhunger.service.ProviderService;

@CrossOrigin
@RestController
@RequestMapping("/api/provider")
@SuppressWarnings({"unchecked", "rawtypes"})
public class ProviderController {

	@Autowired
	ProviderService providerService;
	
	@GetMapping
	public ResponseEntity<?> getAllProviders() {
		List<Provider> listOfProviders = providerService.getAllProviders();
		return new ResponseEntity(listOfProviders, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getProviderById(@PathVariable("id") int id) {
		Provider provider = providerService.getProvider(id);
		
		if (provider != null) {
			return new ResponseEntity(provider, HttpStatus.OK);
		}
		
		return new ResponseEntity("No provider with matching Id found", HttpStatus.NOT_FOUND);
	}
	
	@PostMapping
	public ResponseEntity<?> addProvider(@RequestBody Provider provider) {
		Provider result;
		if(provider.getId()==0)
		{
			result = providerService.addProvider(provider);
		}
		else
		{	
			result = providerService.updateProvider(provider);
		}
 
		return new ResponseEntity(result, HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateUser(@PathVariable("id") int id, @RequestBody Provider provider) {
		provider.setId(id);
		Provider result = providerService.updateProvider(provider);
		return new ResponseEntity(result, HttpStatus.OK);
	}
 
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable("id") int id) {
		Boolean result = providerService.deleteProvider(id);
		if (result) {
			return new ResponseEntity(result, HttpStatus.OK);
		}
		
		return new ResponseEntity("Failed to delete user", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping("/{id}/food")
	public ResponseEntity<?> getFoodItemsByProviderId(@PathVariable("id") int id) {
		List<FoodItem> foodItems = providerService.getFoodItemsByProviderId(id);
		return new ResponseEntity(foodItems, HttpStatus.OK);
	}
	
	@GetMapping("/leaderboard/streak")
	public ResponseEntity<?> getStreakLeaderboard() {
		List<Provider> streakLeaderboard = providerService.getStreakLeaderboard();
		return new ResponseEntity(streakLeaderboard, HttpStatus.OK);
	}
	
	@GetMapping("/leaderboard/points")
	public ResponseEntity<?> getPointsLeaderboard() {
		List<Provider> pointsLeaderboard = providerService.getPointsLeaderboard();
		return new ResponseEntity(pointsLeaderboard, HttpStatus.OK);
	}
}
