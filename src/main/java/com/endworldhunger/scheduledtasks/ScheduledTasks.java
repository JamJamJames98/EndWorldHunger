package com.endworldhunger.scheduledtasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import com.endworldhunger.service.ScheduledTasksService;

@Component
public class ScheduledTasks {
	
	@Autowired
	ScheduledTasksService scheduledTasksService;
	
	//At 01:01 am every day
	@Scheduled(cron = "0 1 1 * * ?")
	public void resetDailyFoodAllowance() {
		scheduledTasksService.resetDailyLimit();
	}
	//At 01:01 am on the 1st of every month
	@Scheduled(cron="0 1 1 1 1/1 *")
	public void resetMonthlyLeaderboard() {
		scheduledTasksService.resetMonthlyLeaderboard();
	}
	
	//At 01:11 am every day
	@Scheduled(cron = "0 11 1 * * ?")
	public void cleanupFoodTable() {
		scheduledTasksService.cleanupFoodItems();	
	}
	
	//At 01:21 am every day
	@Scheduled(cron = "0 21 1 * * ?")
	public void cleanupFoodOrderTable() {
		scheduledTasksService.cleanupFoodOrders();			
	}
	
	//Every 10 seconds
	//@Scheduled(cron = "*/10 * * * * *")
	//public void testing() {
	//	System.out.println("Proving the scheduler works");
	//}
}
