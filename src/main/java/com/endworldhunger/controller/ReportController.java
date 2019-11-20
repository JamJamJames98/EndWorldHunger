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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.endworldhunger.model.UserReport;
import com.endworldhunger.model.Provider;
import com.endworldhunger.model.ProviderReport;
import com.endworldhunger.model.User;
import com.endworldhunger.service.ProviderService;
import com.endworldhunger.service.ReportService;
import com.endworldhunger.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/report")
@SuppressWarnings({"unchecked", "rawtypes"})
public class ReportController {
	@Autowired
	ReportService reportService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	ProviderService providerService;
	
	@GetMapping("/user")
	// Gets list of user reports
	public ResponseEntity<?> getAllUserReport() {
		List<UserReport> listOfUserReport = reportService.getAllUserReport();
		return new ResponseEntity(listOfUserReport, HttpStatus.OK);
	}
	
	@GetMapping("/provider")
	// Gets list of provider reports
	public ResponseEntity<?> getAllProviderReport() {
		List<ProviderReport> listOfProviderReport = reportService.getAllProviderReport();
		return new ResponseEntity(listOfProviderReport, HttpStatus.OK);
	}
	
	@GetMapping("/user/{id}")
	// Gets user report by id of report
	public ResponseEntity<?> getUserReport(@PathVariable("id") int id) {
		UserReport userReport = reportService.getUserReport(id);
		return new ResponseEntity(userReport, HttpStatus.OK);
	}
	
	@GetMapping("/provider/{id}")
	// Gets provider report by id of report
	public ResponseEntity<?> getProviderReport(@PathVariable("id") int id) {
		ProviderReport providerReport = reportService.getProviderReport(id);
		return new ResponseEntity(providerReport, HttpStatus.OK);
	}
	
	@PostMapping("/user")
	// Adds user report using body
	public ResponseEntity<?> addUserReport(@RequestBody UserReport userReport) {
		int userId = userReport.getUserId().getId();
		User user = userService.getUser(userId);
		userReport.setUserId(user);
		
		if (user == null) {
			return new ResponseEntity("Invalid request, unable to find reported user with given id", HttpStatus.BAD_REQUEST);
		}
		
		reportService.addUserReport(userReport);
		return new ResponseEntity(userReport, HttpStatus.OK);
	}
	
	@PostMapping("/provider")
	// Adds provider report using body
	public ResponseEntity<?> addProviderReport(@RequestBody ProviderReport providerReport) {
		int providerId = providerReport.getProviderId().getId();
		Provider provider = providerService.getProvider(providerId);
		providerReport.setProviderId(provider);
		
		if (provider == null) {
			return new ResponseEntity("Invalid request, unable to find reported provider with given id", HttpStatus.BAD_REQUEST);
		}
		
		reportService.addProviderReport(providerReport);
		return new ResponseEntity(providerReport, HttpStatus.OK);
	}
	
	@DeleteMapping("/user/{id}")
	// Deletes a user report by the id of the user report
	public ResponseEntity<?> deleteUserReport(@PathVariable("id") int id) {
		Boolean result = reportService.deleteUserReport(id); 
		if (result) {
			return new ResponseEntity(result, HttpStatus.OK);
		}
		
		return new ResponseEntity("Failed to delete user report", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@DeleteMapping("/provider/{id}")
	// Deletes a provider report by the id of the provider report
	public ResponseEntity<?> deleteProviderReport(@PathVariable("id") int id) {
		Boolean result = reportService.deleteProviderReport(id); 
		if (result) {
			return new ResponseEntity(result, HttpStatus.OK);
		}
		
		return new ResponseEntity("Failed to delete provider ban", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}
