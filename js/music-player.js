/**
 * Island Vibes Kitchen - Caribbean Music Player
 * Creates an ambient dining atmosphere with authentic Caribbean music
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the music player when DOM is fully loaded
    initMusicPlayer();
});

/**
 * Initialize the music player component
 */
function initMusicPlayer() {
    const musicPlayer = document.getElementById('caribbean-music-player');
    if (!musicPlayer) return;
    
    const playButton = document.getElementById('music-play-button');
    const pauseButton = document.getElementById('music-pause-button');
    const volumeControl = document.getElementById('music-volume-control');
    const trackTitle = document.getElementById('current-track-title');
    const trackArtist = document.getElementById('current-track-artist');
    const progressBar = document.getElementById('music-progress-bar');
    const playlistContainer = document.getElementById('playlist-container');
    const audioElement = document.getElementById('audio-element');
    
    // Caribbean music playlist - titles, artists, and file paths
    const playlist = [
        {
            title: "Reggae Sunrise",
            artist: "Island Rhythms",
            file: "audio/reggae-sunrise.mp3"
        },
        {
            title: "Kingston Breeze",
            artist: "Jamaican Beats",
            file: "audio/kingston-breeze.mp3"
        },
        {
            title: "Caribbean Waves",
            artist: "Tropical Sounds",
            file: "audio/caribbean-waves.mp3"
        },
        {
            title: "Steel Drum Paradise",
            artist: "Island Ensemble",
            file: "audio/steel-drum-paradise.mp3"
        },
        {
            title: "Sunset in Montego Bay",
            artist: "Reggae Collective",
            file: "audio/sunset-montego-bay.mp3"
        }
    ];
    
    let currentTrackIndex = 0;
    let isPlaying = false;
    
    // Update the audio source when a new track is selected
    function loadTrack(trackIndex) {
        // Set a default embedded YouTube video as fallback if audio files not available
        const defaultYouTubeEmbedURL = "https://www.youtube.com/embed/videoseries?list=PLrI4ODEXJVpNEDvArgn9GmraK_u2AKq3g&autoplay=0";
        
        if (audioElement) {
            if (playlist[trackIndex] && playlist[trackIndex].file) {
                // Try to use local audio file if available
                audioElement.src = playlist[trackIndex].file;
            } else {
                // Replace audio player with YouTube embed if no audio files available
                createYouTubeEmbed(defaultYouTubeEmbedURL);
                return;
            }
            
            // Update track info in the UI
            if (trackTitle) trackTitle.textContent = playlist[trackIndex].title;
            if (trackArtist) trackArtist.textContent = playlist[trackIndex].artist;
            
            // Autoplay if player was already playing
            if (isPlaying) {
                audioElement.play().catch(error => {
                    console.error("Audio playback failed:", error);
                    // Fallback to YouTube embed if audio playback fails
                    createYouTubeEmbed(defaultYouTubeEmbedURL);
                });
            }
        } else {
            // If audio element not found, use YouTube embed as fallback
            createYouTubeEmbed(defaultYouTubeEmbedURL);
        }
    }
    
    /**
     * Create a YouTube embed as fallback for audio player
     * This ensures users can still enjoy Caribbean music even without audio files
     */
    function createYouTubeEmbed(embedURL) {
        const playerContainer = document.getElementById('caribbean-music-player');
        if (!playerContainer) return;
        
        // Create responsive YouTube embed
        const embedContainer = document.createElement('div');
        embedContainer.className = 'youtube-embed-container';
        
        const iframe = document.createElement('iframe');
        iframe.width = "100%";
        iframe.height = "166";
        iframe.src = embedURL;
        iframe.title = "Caribbean Music Playlist";
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        
        embedContainer.appendChild(iframe);
        
        // Replace player controls with YouTube embed
        playerContainer.innerHTML = '';
        playerContainer.appendChild(embedContainer);
        
        // Add message about external playlist
        const embedMessage = document.createElement('p');
        embedMessage.className = 'embed-message';
        embedMessage.textContent = "Enjoy our curated Caribbean music playlist while browsing!";
        playerContainer.appendChild(embedMessage);
    }
    
    // Generate playlist UI items
    function renderPlaylist() {
        if (!playlistContainer) return;
        
        playlistContainer.innerHTML = '';
        
        playlist.forEach((track, index) => {
            const playlistItem = document.createElement('div');
            playlistItem.className = 'playlist-item';
            if (index === currentTrackIndex) {
                playlistItem.classList.add('current');
            }
            
            playlistItem.innerHTML = `
                <div class="track-info">
                    <span class="track-title">${track.title}</span>
                    <span class="track-artist">${track.artist}</span>
                </div>
            `;
            
            playlistItem.addEventListener('click', () => {
                currentTrackIndex = index;
                loadTrack(currentTrackIndex);
                if (isPlaying) {
                    audioElement.play().catch(e => console.error("Playback failed:", e));
                }
                
                // Update current track styling
                document.querySelectorAll('.playlist-item').forEach(item => {
                    item.classList.remove('current');
                });
                playlistItem.classList.add('current');
            });
            
            playlistContainer.appendChild(playlistItem);
        });
    }
    
    // Event listeners for player controls
    if (playButton) {
        playButton.addEventListener('click', () => {
            isPlaying = true;
            audioElement.play().catch(e => console.error("Playback failed:", e));
            updatePlayPauseState();
        });
    }
    
    if (pauseButton) {
        pauseButton.addEventListener('click', () => {
            isPlaying = false;
            audioElement.pause();
            updatePlayPauseState();
        });
    }
    
    if (volumeControl) {
        volumeControl.addEventListener('input', () => {
            audioElement.volume = volumeControl.value;
        });
    }
    
    // Update play/pause button visibility based on playback state
    function updatePlayPauseState() {
        if (playButton && pauseButton) {
            if (isPlaying) {
                playButton.style.display = 'none';
                pauseButton.style.display = 'inline-flex';
            } else {
                playButton.style.display = 'inline-flex';
                pauseButton.style.display = 'none';
            }
        }
    }
    
    // Update progress bar during playback
    if (audioElement && progressBar) {
        audioElement.addEventListener('timeupdate', () => {
            const progress = (audioElement.currentTime / audioElement.duration) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }
    
    // Handle end of track by playing next track
    if (audioElement) {
        audioElement.addEventListener('ended', () => {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            loadTrack(currentTrackIndex);
            audioElement.play().catch(e => console.error("Playback failed:", e));
            renderPlaylist();
        });
    }
    
    // Initialize player with first track
    loadTrack(currentTrackIndex);
    renderPlaylist();
    updatePlayPauseState();
}