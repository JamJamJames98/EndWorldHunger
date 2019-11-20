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

import com.endworldhunger.model.User;
import com.endworldhunger.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
@SuppressWarnings({"unchecked", "rawtypes"})
public class UserController {
 
	@Autowired
	UserService userService;
 
	@GetMapping
	public ResponseEntity<?> getAllUsers() {
		List<User> listOfUsers = userService.getAllUsers();
		for (int i = 0; i < listOfUsers.size(); i++) {
			System.out.println(listOfUsers.get(i).getUsername() + " " + listOfUsers.get(i).getPassword());
		}
		return new ResponseEntity(listOfUsers, HttpStatus.OK);
	}
 
	@GetMapping("/{id}")
	public ResponseEntity<?> getUserById(@PathVariable("id") int id) {
		User user = userService.getUser(id);
		
		if (user != null) {
			return new ResponseEntity(user, HttpStatus.OK);
		}
		
		return new ResponseEntity("No user with matching ID found", HttpStatus.NOT_FOUND);
	}
 
	@PostMapping
	public ResponseEntity<?> addUser(@RequestBody User user) {
		User result;
		if(user.getId()==0)
		{
			result = userService.addUser(user);
		}
		else
		{	
			result = userService.updateUser(user);
		}
 
		return new ResponseEntity(result, HttpStatus.OK);
	}
 
	@PutMapping("/{id}")
	public ResponseEntity<?> updateUser(@PathVariable("id") int id, @RequestBody User user) {
		user.setId(id);
		User result = userService.updateUser(user);
		return new ResponseEntity(result, HttpStatus.OK);
	}
 
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable("id") int id) {
		Boolean result = userService.deleteUser(id);
		if (result) {
			return new ResponseEntity(result, HttpStatus.OK);
		}
		
		return new ResponseEntity("Failed to delete user", HttpStatus.INTERNAL_SERVER_ERROR);
	}	
}