import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import {
  FaCheck,
  FaMinus,
  FaChevronDown,
  FaChevronRight,
  FaSearch,
  FaFilter,
  FaTimes,
  FaLayerGroup,
  FaRegStar,
  FaStar,
} from "react-icons/fa";

// ========== Animations ==========
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(101, 87, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(101, 87, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(101, 87, 255, 0); }
`;

const slideDown = keyframes`
  from { max-height: 0; opacity: 0; }
  to { max-height: 1000px; opacity: 1; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// ========== Styled Components ==========
const Container = styled.div`
  font-family: "Inter", sans-serif;
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.4s ease-out;
`;

const Title = styled.h2`
  color: #6557ff;
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #6557ff, #a18fff);
    border-radius: 3px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f8f7ff;
  border-radius: 10px;
  padding: 8px 16px;
  margin-bottom: 1.5rem;
  transition: all 0.3s;
  border: 1px solid #e0dcff;

  &:focus-within {
    box-shadow: 0 0 0 3px rgba(101, 87, 255, 0.2);
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  padding: 8px;
  font-size: 0.95rem;
  color: #555;
  outline: none;

  &::placeholder {
    color: #aaa;
  }
`;

const FilterButton = styled.button`
  background: #6557ff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background: #5547e0;
    transform: translateY(-1px);
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 500px;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1b9ff;
    border-radius: 10px;

    &:hover {
      background: #6557ff;
    }
  }
`;

const Item = styled.li`
  margin-bottom: 4px;
  position: relative;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => (props.isFocused ? "#f8f7ff" : "transparent")};
  position: relative;
  overflow: hidden;

  &:hover {
    background: #f8f7ff;
    transform: translateX(5px);
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(101, 87, 255, 0.1), transparent);
  }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const CustomCheckbox = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: 2px solid ${(props) => (props.checked ? "#6557ff" : "#d1d1d1")};
  border-radius: 6px;
  margin-right: 14px;
  background: ${(props) => (props.checked ? "#6557ff" : "white")};
  transition: all 0.2s;
  position: relative;
  flex-shrink: 0;

  ${(props) =>
    props.indeterminate &&
    css`
      background: #6557ff;
      border-color: #6557ff;
    `}

  ${(props) =>
    props.checked &&
    !props.indeterminate &&
    css`
      animation: ${pulse} 0.5s ease-out;
    `}
`;

const Text = styled.span`
  flex: 1;
  font-size: 1rem;
  color: ${(props) => (props.hasChildren ? "#444" : "#666")};
  font-weight: ${(props) => (props.hasChildren ? "600" : "400")};
  transition: all 0.2s;
`;

const ChildrenContainer = styled.div`
  margin-left: 42px;
  padding-left: 12px;
  border-left: 2px dashed rgba(101, 87, 255, 0.2);
  overflow: hidden;
  animation: ${slideDown} 0.3s ease-out;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #aaa;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  margin-right: 4px;

  &:hover {
    color: #6557ff;
    transform: scale(1.1);
  }
`;

const FavoriteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.favorited ? "#ffc107" : "#ddd")};
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    color: #ffc107;
    transform: scale(1.1);
  }
`;

const ResultsContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f9f9ff;
  border-radius: 14px;
  border: 1px solid rgba(101, 87, 255, 0.15);
  animation: ${fadeIn} 0.4s ease-out;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ResultsTitle = styled.h3`
  color: #6557ff;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #ff5252;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    color: #ff0000;
    transform: translateY(-1px);
  }
`;

const ResultsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ResultItem = styled.li`
  background: linear-gradient(135deg, #6557ff, #9a8cff);
  color: white;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 3px 10px rgba(101, 87, 255, 0.2);
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(101, 87, 255, 0.3);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #888;
  font-size: 0.95rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(101, 87, 255, 0.2);
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #6557ff, #9a8cff);
  color: white;

  &:hover {
    background: linear-gradient(135deg, #5547e0, #8a7cff);
  }
`;

const SecondaryButton = styled(Button)`
  background: #f0f0f0;
  color: #555;

  &:hover {
    background: #e0e0e0;
  }
`;

const Badge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
  margin-left: 6px;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: ${rotate} 1s ease-in-out infinite;
`;

// ========== Components ==========
const Checkbox = ({
  id,
  label,
  checked,
  indeterminate,
  onChange,
  children,
  level = 0,
  onFocus,
  onBlur,
  hasChildren,
  favorited,
  onToggleFavorite,
  isSearchMatch,
}) => {
  const [isOpen, setIsOpen] = useState(level < 1);
  const [isFocused, setIsFocused] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <Item style={{ display: isSearchMatch ? "block" : "none" }}>
      <Label htmlFor={id} isFocused={isFocused}>
        {hasChildren && (
          <ToggleButton
            type="button"
            onClick={handleToggle}
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? (
              <FaChevronDown size={14} />
            ) : (
              <FaChevronRight size={14} />
            )}
          </ToggleButton>
        )}

        <Input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <CustomCheckbox checked={checked} indeterminate={indeterminate}>
          {indeterminate ? (
            <FaMinus size={12} color="white" />
          ) : (
            checked && <FaCheck size={12} color="white" />
          )}
        </CustomCheckbox>

        <Text hasChildren={hasChildren}>{label}</Text>

        <FavoriteButton
          favorited={favorited}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(id);
          }}
          aria-label={favorited ? "Remove favorite" : "Add favorite"}
        >
          {favorited ? <FaStar size={14} /> : <FaRegStar size={14} />}
        </FavoriteButton>
      </Label>

      {hasChildren && isOpen && (
        <ChildrenContainer>
          <List>{children}</List>
        </ChildrenContainer>
      )}
    </Item>
  );
};

const NestedCheckbox = ({ data, title, required, initialSelected }) => {
  const [selectedItems, setSelectedItems] = useState(initialSelected || []);
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [data]);

  const flattenTree = (nodes, parentId = null) => {
    return nodes.reduce((acc, node) => {
      const item = { ...node, parentId };
      return [
        ...acc,
        item,
        ...(node.children ? flattenTree(node.children, node.id) : []),
      ];
    }, []);
  };

  const allItems = flattenTree(data);

  const getAllChildrenIds = (parentId) => {
    const children = allItems.filter((item) => item.parentId === parentId);
    return children.reduce(
      (acc, child) => [...acc, child.id, ...getAllChildrenIds(child.id)],
      []
    );
  };

  const getAllParentIds = (childId) => {
    const parents = [];
    let currentId = childId;

    while (true) {
      const item = allItems.find((item) => item.id === currentId);
      if (!item || !item.parentId) break;
      parents.push(item.parentId);
      currentId = item.parentId;
    }

    return parents;
  };

  const handleCheckboxChange = (id, checked) => {
    let newSelected = [...selectedItems];
    const allChildren = getAllChildrenIds(id);
    const parents = getAllParentIds(id);

    if (checked) {
      // Add item, its children, and parents if needed
      newSelected = [...new Set([...newSelected, id, ...allChildren])];

      // Add parents if all their children are selected
      parents.forEach((parentId) => {
        const parentChildren = allItems.filter(
          (item) => item.parentId === parentId
        );
        const parentChildrenIds = parentChildren.map((child) => child.id);
        if (
          parentChildrenIds.every((childId) => newSelected.includes(childId))
        ) {
          newSelected = [...new Set([...newSelected, parentId])];
        }
      });
    } else {
      // Remove item, its children, and parents
      newSelected = newSelected.filter(
        (itemId) => itemId !== id && !allChildren.includes(itemId)
      );

      // Remove any parents that might have been selected
      parents.forEach((parentId) => {
        newSelected = newSelected.filter((itemId) => itemId !== parentId);
      });
    }

    setSelectedItems(newSelected);
  };

  const toggleSelectAll = (select) => {
    if (select) {
      // Select all items (both parents and children)
      setSelectedItems(allItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const isChecked = (id) => selectedItems.includes(id);

  const isIndeterminate = (id) => {
    const children = allItems.filter((item) => item.parentId === id);
    if (children.length === 0) return false;

    const someSelected = children.some((child) =>
      selectedItems.includes(child.id)
    );
    const allSelected = children.every((child) =>
      selectedItems.includes(child.id)
    );

    return someSelected && !allSelected;
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const isSearchMatch = (item) => {
    if (!searchTerm) return true;
    const matchesSearch = item.label
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // If it's a parent, check if any children match
    if (item.children) {
      const childrenMatch = item.children.some((child) => isSearchMatch(child));
      return matchesSearch || childrenMatch;
    }

    return matchesSearch;
  };

  const filteredData =
    filter === "favorites"
      ? data.filter((item) => favorites.includes(item.id))
      : data;

  const selectedLabels = selectedItems
    .map((id) => {
      const item = allItems.find((item) => item.id === id);
      return item ? item.label : null;
    })
    .filter(Boolean);

  const clearSelection = () => {
    setSelectedItems([]);
    setShowResults(false);
  };

  return (
    <Container>
      <Title>
        <FaLayerGroup style={{ color: "#9a8cff" }} />
        {title || "Advanced Selection"}
      </Title>

      <SearchContainer>
        <FaSearch style={{ color: "#aaa" }} />
        <SearchInput
          type="text"
          placeholder="Search options..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterButton
          onClick={() =>
            setFilter(filter === "favorites" ? "all" : "favorites")
          }
        >
          <FaFilter /> {filter === "favorites" ? "Show All" : "Favorites"}
        </FilterButton>
      </SearchContainer>

      {isLoading ? (
        <EmptyState>
          <LoadingSpinner /> Loading options...
        </EmptyState>
      ) : (
        <List>{renderTree(filteredData)}</List>
      )}

      <Actions>
        <PrimaryButton
          onClick={() => setShowResults(true)}
          disabled={selectedItems.length === 0}
        >
          <FaCheck /> Show Selection{" "}
          {selectedItems.length > 0 && <Badge>{selectedItems.length}</Badge>}
        </PrimaryButton>
        <SecondaryButton onClick={() => toggleSelectAll(true)}>
          <FaCheck /> Select All
        </SecondaryButton>
        <SecondaryButton onClick={() => toggleSelectAll(false)}>
          <FaTimes /> Clear All
        </SecondaryButton>
      </Actions>

      {showResults && (
        <ResultsContainer>
          <ResultsHeader>
            <ResultsTitle>
              <FaCheck /> Selected Items
              <Badge>{selectedLabels.length}</Badge>
            </ResultsTitle>
            <ClearButton onClick={clearSelection}>
              <FaTimes /> Clear
            </ClearButton>
          </ResultsHeader>

          {selectedLabels.length > 0 ? (
            <ResultsList>
              {selectedLabels.map((label, index) => (
                <ResultItem key={index}>
                  <FaCheck size={12} /> {label}
                </ResultItem>
              ))}
            </ResultsList>
          ) : (
            <EmptyState>No items selected</EmptyState>
          )}
        </ResultsContainer>
      )}
    </Container>
  );

  function renderTree(nodes) {
    return nodes.map((node) => (
      <Checkbox
        key={node.id}
        id={node.id}
        label={node.label}
        checked={isChecked(node.id)}
        indeterminate={isIndeterminate(node.id)}
        onChange={(checked) => handleCheckboxChange(node.id, checked)}
        hasChildren={!!node.children}
        favorited={favorites.includes(node.id)}
        onToggleFavorite={toggleFavorite}
        isSearchMatch={isSearchMatch(node)}
      >
        {node.children && renderTree(node.children)}
      </Checkbox>
    ));
  }
};

// Example Usage
const App = () => {
  const data = [
    {
      id: "electronics",
      label: "Electronics",
      children: [
        {
          id: "phones",
          label: "Smartphones",
          children: [
            { id: "iphone", label: "iPhone 15 Pro" },
            { id: "samsung", label: "Samsung Galaxy S24" },
            { id: "pixel", label: "Google Pixel 8" },
          ],
        },
        {
          id: "computers",
          label: "Computers",
          children: [
            {
              id: "laptops",
              label: "Laptops",
              children: [
                { id: "macbook", label: "MacBook Pro M3" },
                { id: "surface", label: "Surface Laptop 5" },
                { id: "xps", label: "Dell XPS 15" },
              ],
            },
            {
              id: "desktops",
              label: "Desktops",
              children: [
                { id: "imac", label: 'iMac 24"' },
                { id: "hp", label: "HP Envy" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "home",
      label: "Home Appliances",
      children: [
        { id: "tv", label: "Smart TVs" },
        { id: "fridge", label: "Refrigerators" },
        { id: "washing", label: "Washing Machines" },
      ],
    },
    {
      id: "furniture",
      label: "Furniture",
      children: [
        { id: "sofa", label: "Sofas" },
        { id: "table", label: "Dining Tables" },
        { id: "bed", label: "Beds" },
      ],
    },
  ];

  return (
    <div style={{ padding: "2rem", background: "#f9f9ff", minHeight: "100vh" }}>
      <NestedCheckbox data={data} title="Product Catalog Selector" />
    </div>
  );
};

export default App;
