package stallManagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Represents a single stall document in the MongoDB 'stalls' collection.
 */
@Document(collection = "stalls")
public class Stall {

    /**
     * The unique identifier for the stall (e.g., "A1", "B5"). 
     * This serves as the primary key.
     */
    @Id
    private String id;

    /**
     * The size category of the stall (Small, Medium, or Large).
     */
    private StallSize size;

    /**
     * The current availability status (true if available, false if reserved).
     */
    private boolean isAvailable;

    /**
     * Location details (e.g., coordinates, section name).
     */
    private String location; 

    /**
     * A generated description for display purposes.
     */
    private String description;
    
    // --- Enum for Stall Size ---
    public enum StallSize {
        SMALL, MEDIUM, LARGE
    }

    // --- Constructors ---

    /**
     * Default constructor required by Spring Data MongoDB.
     */
    public Stall() {} 

    /**
     * Parameterized constructor for easy creation.
     */
    public Stall(String id, StallSize size, boolean isAvailable, String location) {
        this.id = id;
        this.size = size;
        this.isAvailable = isAvailable;
        this.location = location;
        // Auto-generate a simple description
        this.description = size.name() + " Stall at " + location;
    }

    // --- Getters and Setters ---

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public StallSize getSize() {
        return size;
    }

    public void setSize(StallSize size) {
        this.size = size;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}