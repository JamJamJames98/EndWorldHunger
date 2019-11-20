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

import com.endworldhunger.model.Provider;
import com.endworldhunger.model.UserLogs;
import com.endworldhunger.service.UserLogsService;

@CrossOrigin
@RestController
@RequestMapping("/api/userlogs")
@SuppressWarnings({"unchecked", "rawtypes"})
public class LogController {
	
	@Autowired
	UserLogsService userLogsService;
	
	@GetMapping("/user/{id}")
	// Get all logs by inputting an user id
	public ResponseEntity<?> getAllLogsByUserId(@PathVariable("id") int id) {
		List<UserLogs> listOfUserLogs = userLogsService.getAllLogsByUserId(id);
		return new ResponseEntity(listOfUserLogs, HttpStatus.OK);
	}
	
	@GetMapping("/provider/{id}")
	// Get all logs by inputting a provider id
	public ResponseEntity<?> getAllLogsByProviderId(@PathVariable("id") int id) {
		List<UserLogs> listOfProviderLogs = userLogsService.getAllLogsByProviderId(id);
		return new ResponseEntity(listOfProviderLogs, HttpStatus.OK);
	}
	
}
