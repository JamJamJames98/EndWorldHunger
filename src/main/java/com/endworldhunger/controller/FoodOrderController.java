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

import com.endworldhunger.model.FoodOrder;
import com.endworldhunger.model.Provider;
import com.endworldhunger.model.User;
import com.endworldhunger.model.UserLogs;
import com.endworldhunger.service.FoodOrderService;
import com.endworldhunger.service.UserService;
import com.endworldhunger.service.ProviderService;
import com.endworldhunger.service.FoodItemService;
import com.endworldhunger.service.UserLogsService;

@CrossOrigin
@RestController
@RequestMapping("/api/foodorder")
@SuppressWarnings({"unchecked", "rawtypes"})
public class FoodOrderController {
	@Autowired
	FoodOrderService foodOrderService;
	@Autowired
	UserService userService;
	@Autowired
	ProviderService providerService;
	@Autowired
	FoodItemService foodItemService;
	@Autowired
	UserLogsService logService;

	@GetMapping("/order/{id}")
	// Gets order by its id
	public ResponseEntity<?> getFoodOrderById(@PathVariable("id") int id) {
		FoodOrder foodOrder = foodOrderService.getFoodOrder(id);
		return new ResponseEntity(foodOrder, HttpStatus.OK);
	}

	@GetMapping("/provider/{id}")
	// Gets list of orders by its provider id
	public ResponseEntity<?> getFoodOrderByProviderId(@PathVariable("id") int id) {
		List<FoodOrder> foodOrderList = foodOrderService.getFoodOrderByProviderId(id);
		return new ResponseEntity(foodOrderList, HttpStatus.OK);
	}

	@GetMapping("/user/{id}")
	// Gets list of orders by its user id
	public ResponseEntity<?> getFoodOrderByUserId(@PathVariable("id") int id) {
		List<FoodOrder> foodOrderList = foodOrderService.getFoodOrderByUserId(id);
		return new ResponseEntity(foodOrderList, HttpStatus.OK);
	}

	@PostMapping("/provider/{idProvider}/{idUser}")
	// Adds order for a provider
	public ResponseEntity<?> addFoodOrder(@PathVariable("idProvider") int idP, @PathVariable("idUser") int idU, @RequestBody FoodOrder foodOrder){
		User user = userService.getUser(idU);
		Provider provider = providerService.getProvider(idP);
		foodOrder.setProviderId(provider);
		foodOrder.setUserId(user);

		int orderAmount = foodOrder.getQuantity();
		int userLimitLeft = user.getDailyLimit();
		System.out.println(foodOrder.getFoodItem().getQuantity());
		System.out.println(foodOrder.getFoodItem().getId());
		System.out.println(foodOrder.getFoodItem().getProvider());

		
		int itemQuantityLeft = foodOrder.getFoodItem().getQuantity();

		if (orderAmount > userLimitLeft) {
			return new ResponseEntity("User daily limit exceeded", HttpStatus.BAD_REQUEST);
		}
		if (orderAmount > itemQuantityLeft) {
			return new ResponseEntity("Item remaining quantity exceeded", HttpStatus.BAD_REQUEST);
		}

		FoodOrder newFoodOrder = foodOrderService.addFoodOrder(foodOrder);
		foodItemService.updateFoodItemQuantity(foodOrder.getFoodItem().getId(), foodOrder.getQuantity());
		userService.updateDailyLimit(user.getId(), foodOrder.getQuantity());
		if (newFoodOrder == null)
			System.out.println("NEWFOOD ORDER NULSLUAL");

		// Log
		UserLogs userLog = new UserLogs();
		String activity = "You left an order for Provider " + provider.getProviderName() + " - " + newFoodOrder.getId();
		userLog.setActivity(activity);
		userLog.setUser(user);
		userLog.setLogTime(newFoodOrder.getOrderTime());
		logService.addUserLogs(userLog);

		return new ResponseEntity(newFoodOrder, HttpStatus.OK);
	}

	@PutMapping("/{id}/{status}")
	// Returns one if one update is made else none, updates id status to string
	public ResponseEntity<?> updateFoodOrderStatus(@PathVariable("id") int id, @PathVariable("status") String status){
		int updates = foodOrderService.updateFoodOrderStatus(id, status);

		if(status.equals("Completed")) {
			FoodOrder foodOrder = foodOrderService.getFoodOrder(id);
			UserLogs providerLog = new UserLogs();
			String activity = "You completed order - " + foodOrder.getId();
			providerLog.setActivity(activity);
			providerLog.setProvider(foodOrder.getProviderId());
			Date date = new Date();
			providerLog.setLogTime(new Timestamp(date.getTime()));
			logService.addUserLogs(providerLog);
		}

		return new ResponseEntity(updates, HttpStatus.OK);
	}
}
