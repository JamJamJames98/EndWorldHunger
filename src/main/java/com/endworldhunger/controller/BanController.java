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

import com.endworldhunger.model.UserBan;
import com.endworldhunger.model.Provider;
import com.endworldhunger.model.ProviderBan;
import com.endworldhunger.model.User;
import com.endworldhunger.service.BanService;
import com.endworldhunger.service.ProviderService;
import com.endworldhunger.service.ReportService;
import com.endworldhunger.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/ban")
@SuppressWarnings({"unchecked", "rawtypes"})
public class BanController {
	@Autowired
	BanService banService;
	
	@Autowired
	ReportService reportService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	ProviderService providerService;
	
	@GetMapping("/user")
	// Gets list of user bans
	public ResponseEntity<?> getAllUserBan() {
		List<UserBan> listOfUserBan = banService.getAllUserBan();
		return new ResponseEntity(listOfUserBan, HttpStatus.OK);
	}
	
	@GetMapping("/provider")
	// Gets list of provider bans
	public ResponseEntity<?> getAllProviderBan() {
		List<ProviderBan> listOfProviderBan = banService.getAllProviderBan();
		return new ResponseEntity(listOfProviderBan, HttpStatus.OK);
	}
	
	@GetMapping("/user/{id}")
	// Gets user ban by id of ban
	public ResponseEntity<?> getUserBan(@PathVariable("id") int id) {
		UserBan userBan = banService.getUserBan(id);
		return new ResponseEntity(userBan, HttpStatus.OK);
	}
	
	@GetMapping("/provider/{id}")
	// Gets provider ban by id of ban
	public ResponseEntity<?> getProviderBan(@PathVariable("id") int id) {
		ProviderBan providerBan = banService.getProviderBan(id);
		return new ResponseEntity(providerBan, HttpStatus.OK);
	}
	
	@GetMapping("/user/{id}/all")
	// Gets all bans of user
	public ResponseEntity<?> getAllBanOfUser(@PathVariable("id") int id) {
		List<UserBan> bans = banService.getAllBanOfUser(id);
		return new ResponseEntity(bans, HttpStatus.OK);
	}
	
	@GetMapping("/provider/ban/{id}/all")
	// Gets all bans of provider
	public ResponseEntity<?> getAllBanOfProvider(@PathVariable("id") int id) {
		List<ProviderBan> bans = banService.getAllBanOfProvider(id);
		return new ResponseEntity(bans, HttpStatus.OK);
	}
	
	@PostMapping("/user")
	// Adds user ban using body
	public ResponseEntity<?> addUserBan(@RequestBody UserBan userBan) {
		int userId = userBan.getUserId().getId();
		User user = userService.getUser(userId);
		
		// when banning people, remove all reports of the user
		reportService.deleteAllReportsOfUser(user.getId());
		
		userBan.setUserId(user);
		banService.addUserBan(userBan);
		return new ResponseEntity(userBan, HttpStatus.OK);
	}
	
	@PostMapping("/provider")
	// Adds provider ban using body
	public ResponseEntity<?> addProviderBan(@RequestBody ProviderBan providerBan) {
		int providerId = providerBan.getProviderId().getId();
		Provider provider = providerService.getProvider(providerId);
		
		// when banning people, remove all reports of the user
		reportService.deleteAllReportsOfProvider(provider.getId());
		
		providerBan.setProviderId(provider);
		banService.addProviderBan(providerBan);
		return new ResponseEntity(providerBan, HttpStatus.OK);
	}
	
	@DeleteMapping("/user/{id}")
	// Deletes a user ban by the id of the user ban
	public ResponseEntity<?> deleteUserBan(@PathVariable("id") int id) {
		Boolean result = banService.deleteUserBan(id); 
		if (result) {
			return new ResponseEntity(result, HttpStatus.OK);
		}
		
		return new ResponseEntity("Failed to delete user ban", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@DeleteMapping("/provider/{id}")
	// Deletes a provider ban by the id of the provider ban
	public ResponseEntity<?> deleteProviderBan(@PathVariable("id") int id) {
		Boolean result = banService.deleteProviderBan(id); 
		if (result) {
			return new ResponseEntity(result, HttpStatus.OK);
		}
		
		return new ResponseEntity("Failed to delete provider ban", HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
