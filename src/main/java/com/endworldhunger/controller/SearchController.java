package com.endworldhunger.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.endworldhunger.service.SearchService;

@CrossOrigin
@RestController
@RequestMapping("/api/search")
@SuppressWarnings({"unchecked", "rawtypes"})
public class SearchController {
 
	@Autowired
	SearchService searchService;
	
	/*	
	 * public List<Provider> getProviderList(String searchString);
	 * public List<FoodItem> getFoodItemsList(String searchString);
	 */
	@GetMapping("/providers")
	public ResponseEntity<?> getProviderList(
		@RequestParam String searchString, 
		@RequestParam String longitude, 
		@RequestParam String latitude, 
		@RequestParam String consumerType) {
		
		JSONObject results = searchService.searchProviders(searchString, longitude, latitude, consumerType);
		return new ResponseEntity(results.toMap(), HttpStatus.OK);
	}
		
	@GetMapping("/food")
	public ResponseEntity <?> getFoodItemsList(
		@RequestParam String searchString, 
		@RequestParam String longitude, 
		@RequestParam String latitude, 
		@RequestParam String consumerType) {
		
		JSONObject results = searchService.searchFood(searchString, longitude, latitude, consumerType);

		return new ResponseEntity(results.toMap(), HttpStatus.OK);
	}
	
}

