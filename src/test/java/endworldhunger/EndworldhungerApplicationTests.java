package endworldhunger;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import com.endworldhunger.model.Provider;
import com.endworldhunger.model.User;
import com.endworldhunger.model.FoodItem;
import com.endworldhunger.model.FoodOrder;
import com.endworldhunger.service.ProviderService;
import com.endworldhunger.service.UserService;
import com.endworldhunger.service.FoodItemService;
import com.endworldhunger.service.FoodOrderService;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = EndworldhungerApplicationTests.class)
@ContextConfiguration
@AutoConfigureMockMvc
@ComponentScan({"com.endworldhunger"})
public class EndworldhungerApplicationTests {

	@Autowired
	public UserService userService;
	
	@Autowired
	public ProviderService providerService;
	
	@Autowired
	public FoodOrderService foodOrderService;
	
	@Autowired
	public FoodItemService foodItemService;
	
	@Test
	public void savedUserHasFields() {
		User user = new User();
		user.setUsername("This is a test");
		user.setName("Voila");
		user.setPassword("password");
		user.setEmail("Haha@gmail.com");
		user.setPhoneNumber("934i02343294");
		user.setConsumerType("Individual");
		user.setRating(5);
		user.setStatus("Active");
		User savedUser = userService.addUser(user);
		
		assertThat(savedUser.getId()).isNotNull();
		assertThat(savedUser.getUsername()).isNotNull();
		assertThat(savedUser.getName()).isNotNull();
		assertThat(savedUser.getPassword()).isNotNull();
		assertThat(savedUser.getEmail()).isNotNull();
		assertThat(savedUser.getPhoneNumber()).isNotNull();
		assertThat(savedUser.getConsumerType()).isNotNull();
		assertThat(savedUser.getRating()).isNotNull();
		assertThat(savedUser.getStatus()).isNotNull();
		assertThat(savedUser.getDailyLimit()).isNotNull();
	}
	
	public User generateUser() {
		User user = new User();
		user.setUsername("This is a test");
		user.setName("Voila");
		user.setPassword("password");
		user.setEmail("Haha@gmail.com");
		user.setPhoneNumber("934i02343294");
		user.setConsumerType("Individual");
		user.setRating(5);
		user.setStatus("Active");
		User savedUser = userService.addUser(user);
		return savedUser;
	}
	
	@Test
	public void savedProviderHasFields() {
		Provider provider = new Provider();
		provider.setUsername("This is also a test");
		provider.setPassword("Wahoo");
		provider.setEmail("whatisthis@gmail.com");
		provider.setPhoneNumber("394i230453");
		provider.setProviderType("Restaurant");
		provider.setRating(5);
		provider.setLocation("98 Moorefields rd kingsgrove");
		provider.setStreak(1);
		provider.setProviderName("Heh");
		provider.setLastStreakUpload(new Date());
		provider.setPoints(1);
		provider.setStatus("Active");
		Provider savedProvider = providerService.addProvider(provider);
		
		assertThat(savedProvider.getId()).isNotNull();
		assertThat(savedProvider.getUsername()).isNotNull();
		assertThat(savedProvider.getPassword()).isNotNull();
		assertThat(savedProvider.getEmail()).isNotNull();
		assertThat(savedProvider.getPhoneNumber()).isNotNull();
		assertThat(savedProvider.getProviderType()).isNotNull();
		assertThat(savedProvider.getRating()).isNotNull();
		assertThat(savedProvider.getLocation()).isNotNull();
		assertThat(savedProvider.getLongitude()).isNotNull();
		assertThat(savedProvider.getLatitude()).isNotNull();
		assertThat(savedProvider.getStreak()).isNotNull();
		assertThat(savedProvider.getProviderName()).isNotNull();
		assertThat(savedProvider.getLastStreakUpload()).isNotNull();
		assertThat(savedProvider.getPoints()).isNotNull();
		assertThat(savedProvider.getStatus()).isNotNull();
	}
	
	public Provider generateProvider() {
		Provider provider = new Provider();
		provider.setUsername("This is also a test");
		provider.setPassword("Wahoo");
		provider.setEmail("whatisthis@gmail.com");
		provider.setPhoneNumber("394i230453");
		provider.setProviderType("Restaurant");
		provider.setRating(5);
		provider.setLocation("98 Moorefields rd kingsgrove");
		provider.setStreak(1);
		provider.setProviderName("Heh");
		provider.setLastStreakUpload(new Date());
		provider.setPoints(1);
		provider.setStatus("Active");
		Provider savedProvider = providerService.addProvider(provider);
		return savedProvider;
	}
	
	@Test
	public void savedFoodItemHasFields() {
		FoodItem foodItem = new FoodItem();
		foodItem.setProvider(generateProvider());
		foodItem.setQuantity(1);
		foodItem.setName("teating");
		foodItem.setTimePosted(new Date());
		foodItem.setExpiry(new Date());
		foodItem.setDescription("description");
		foodItem.setImage("image");
		FoodItem savedFoodItem = foodItemService.addFoodItem(foodItem);
		
		assertThat(savedFoodItem.getId()).isNotNull();
		assertThat(savedFoodItem.getProvider()).isNotNull();
		assertThat(savedFoodItem.getQuantity()).isNotNull();
		assertThat(savedFoodItem.getName()).isNotNull();
		assertThat(savedFoodItem.getTimePosted()).isNotNull();
		assertThat(savedFoodItem.getExpiry()).isNotNull();
		assertThat(savedFoodItem.getDescription()).isNotNull();
		assertThat(savedFoodItem.getImage()).isNotNull();
	}
	
	public FoodItem generateFoodItem() {
		FoodItem foodItem = new FoodItem();
		foodItem.setProvider(generateProvider());
		foodItem.setQuantity(1);
		foodItem.setName("teating");
		foodItem.setTimePosted(new Date());
		foodItem.setExpiry(new Date());
		foodItem.setDescription("description");
		foodItem.setImage("image");
		FoodItem savedFoodItem = foodItemService.addFoodItem(foodItem);
		return savedFoodItem;
	}
	
	@Test
	public void savedFoodOrderHasFields() {
		FoodOrder foodOrder = new FoodOrder();
		foodOrder.setUserId(generateUser());
		foodOrder.setProviderId(generateProvider());
		foodOrder.setFoodItem(generateFoodItem());
		foodOrder.setQuantity(10);
		foodOrder.setOrderTime(new Date());
		foodOrder.setOrderCode("23124");
		foodOrder.setStatus("pending");
		FoodOrder savedFoodOrder = foodOrderService.addFoodOrder(foodOrder);
		
		assertThat(savedFoodOrder.getId()).isNotNull();
		assertThat(savedFoodOrder.getUserId()).isNotNull();
		assertThat(savedFoodOrder.getProviderId()).isNotNull();
		assertThat(savedFoodOrder.getFoodItem()).isNotNull();
		assertThat(savedFoodOrder.getQuantity()).isNotNull();
		assertThat(savedFoodOrder.getOrderTime()).isNotNull();
		assertThat(savedFoodOrder.getOrderCode()).isNotNull();
		assertThat(savedFoodOrder.getOrderStatus()).isNotNull();
	}
	
	public FoodOrder generateFoodOrder() {
		FoodOrder foodOrder = new FoodOrder();
		foodOrder.setUserId(generateUser());
		foodOrder.setProviderId(generateProvider());
		foodOrder.setFoodItem(generateFoodItem());
		foodOrder.setQuantity(10);
		foodOrder.setOrderTime(new Date());
		foodOrder.setOrderCode("23124");
		foodOrder.setStatus("pending");
		FoodOrder savedFoodOrder = foodOrderService.addFoodOrder(foodOrder);
		return savedFoodOrder;
	}
	
	
}