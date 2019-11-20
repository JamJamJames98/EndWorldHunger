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
import com.endworldhunger.service.FoodItemService;
import com.endworldhunger.service.ProviderService;

@CrossOrigin
@RestController
@RequestMapping("/api/food")
@SuppressWarnings({"unchecked", "rawtypes"})
public class FoodItemController {
	
	@Autowired
	FoodItemService foodItemService;
	
	@Autowired
	ProviderService providerService;
	
	@PostMapping
	public ResponseEntity<?> addFoodItem(@RequestBody FoodItem foodItem) {		
		int providerId = foodItem.getProvider().getId();
		Provider provider = providerService.getProvider(providerId);
		
		if (provider == null) {
			return new ResponseEntity("Couldn't find Provider with the matching ID", HttpStatus.BAD_REQUEST);
		}
		
		foodItem.setProvider(provider);
		
		FoodItem food = foodItemService.addFoodItem(foodItem);
		return new ResponseEntity(food, HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<?> getAllFoodItem() {
		List<FoodItem> foodItems = foodItemService.getAllFoodItem();
		return new ResponseEntity(foodItems, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getFoodItem(@PathVariable("id") int id) {
		FoodItem result = foodItemService.getFoodItem(id);
		
		if (result != null) {
			return new ResponseEntity(result, HttpStatus.OK);
		}
		
		return new ResponseEntity("No food item with matching ID found", HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/{id}/request/{quantityTaken}")
	public ResponseEntity<?> updateFoodItemQuantity(@PathVariable("id") int id, @PathVariable("quantityTaken") int quantityTaken) {
		int rowsAffected = foodItemService.updateFoodItemQuantity(id, quantityTaken);
		
		if (rowsAffected == -1) {
			return new ResponseEntity("Failed to update food item quantity", HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(rowsAffected + " rows affected", HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteFoodItem(@PathVariable("id") int id) {
		Boolean result = foodItemService.deleteFoodItem(id);
		
		if (result) {
			return new ResponseEntity(result, HttpStatus.OK);
		}
		
		return new ResponseEntity("Failed to delete food item", HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
