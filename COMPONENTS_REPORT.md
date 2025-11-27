# Components Report

This report lists components that were present in `packages/core/src/components` but not in `adyaai/data/components.json`. The manifest has been updated to include these components.

## Added to manifest
- aui-app-bar
- aui-autocomplete
- aui-avatar
- aui-carousel
- aui-circular-progress
- aui-datagrid
- aui-datepicker
- aui-divider
- aui-drawer
- aui-icon
- aui-linear-progress
- aui-list
- aui-menu
- aui-pagination
- aui-rating
- aui-stepper
- aui-table
- aui-tabs
- aui-timeline
- aui-timepicker
- aui-tooltip
- aui-treeview

## Notes
- Entries were added with minimal metadata (name, tagName, description, category, examples, and useCases).
- If you want richer fields (properties/attributes/events/slots), I can parse component source files to extract them next.
 
## Manifest enrichment performed

- Extracted `properties`, `attributes`, `events`, and `slots` for the following components by scanning their TypeScript sources:
	- aui-app-bar
	- aui-autocomplete
	- aui-avatar
	- aui-carousel
	- aui-circular-progress
	- aui-datagrid
	- aui-datepicker
	- aui-divider
	- aui-drawer
	- aui-icon
	- aui-linear-progress
	- aui-list
	- aui-menu
	- aui-pagination
	- aui-rating
	- aui-stepper
	- aui-table
	- aui-tabs
	- aui-timeline
	- aui-timepicker
	- aui-tooltip
	- aui-treeview

Notes:
- Metadata was extracted using `observedAttributes`, JSDoc `@attr` / `@fires` comments, and template slots found in `render()` implementations.
- Programmatic-only properties (e.g., `columns`, `data` on `aui-table`) were included under `properties` but not duplicated as attributes.

Generated on: 2025-11-27
