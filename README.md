# 'Track all Hits for Pathing' Extension for Launch, by Adobe

The 'Track all Hits for Pathing' Extension can be used with Adobe Analytics. It
provides an Action Type that allows you to track every Analytics hit into a
designated prop, which you can then use for pathing reports.

## Usage

The Extension provides an Action Type 'Inject Automatic Tracking of Pages and Actions'.

Add this Action Type into a Rule that fires on all your pages, and you will get automatic tracking of all Analytics tracking calls.

It is safe (and recommended) to use the "Library Loaded" Event Type for this Rule.

## Configuration

When you add the Extension into your Property, you must select a prop to use from the list.

That's it.

## Data tracked

The Extension sets the designated prop on every Analytics call.

If the call is a standard Page View tracking call (```s.t()```), the prop will contain the pageName.

If the call is a custom tracking call (```s.tl()```), the prop will contain the link name.

If the call is automatic download or exit link tracking, the prop will contain "Download Link" or "Exit Link", respectively.
