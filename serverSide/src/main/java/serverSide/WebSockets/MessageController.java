package serverSide.WebSockets;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Controller
public class MessageController {

    List<String> users = new ArrayList<>();

    @SubscribeMapping("/subscribe/{docId}/{userId}")
    public Object subscribe(@DestinationVariable String docId,
                            @DestinationVariable String userId,
                            SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        if (users.contains(userId)) { return "null"; }
        users.add(userId);
        System.out.println(userId);
        Objects.requireNonNull(simpMessageHeaderAccessor.getSessionAttributes()).put("docId", docId);
        Objects.requireNonNull(simpMessageHeaderAccessor.getSessionAttributes()).put("userId", userId);
        return "null";
    }

    @EventListener
    public void onDisconnectEvent(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String docId = (String) Objects.requireNonNull(headerAccessor.getSessionAttributes()).get("docId");
        String userId = (String) Objects.requireNonNull(headerAccessor.getSessionAttributes()).get("userId");
        System.out.println(docId);
        users.remove(userId);
    }
}