package serverSide.WebSockets;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Controller
public class MessageController {

    List<String> users = new ArrayList<>();

    @MessageMapping("/{id}/sendData")
    @SendTo("/topic/public/{id}")
    public Object sendData(@Payload Map<String, Object> payload, @DestinationVariable String id) {
        return payload;
    }

    @SubscribeMapping("/subscribe/{docId}/{userId}")
    public Object subscribe(@DestinationVariable String docId,
                            @DestinationVariable String userId,
                            SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        if (users.contains(userId)) { return "null"; }
        users.add(userId);
        Objects.requireNonNull(simpMessageHeaderAccessor.getSessionAttributes()).put("docId", docId);
        Objects.requireNonNull(simpMessageHeaderAccessor.getSessionAttributes()).put("userId", userId);
        return "null";
    }

    @EventListener
    public void onDisconnectEvent(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String docId = (String) Objects.requireNonNull(headerAccessor.getSessionAttributes()).get("docId");
        String userId = (String) Objects.requireNonNull(headerAccessor.getSessionAttributes()).get("userId");
        users.remove(userId);
    }
}